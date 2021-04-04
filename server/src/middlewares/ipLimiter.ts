import { Request, Response, NextFunction } from "express";
import redis from "redis";

import logger from "./logger";

const redisClient = redis.createClient();

const WINDOW_REQUEST_COUNT = process.env.WINDOW_REQUEST_COUNT || 1000000;
const LOG_INTERVAL_IN_MINITUES = parseFloat(
  process.env.LOG_INTERVAL_IN_MINITUES || "0"
);
const LOG_INTERVAL_IN_SECONDS = LOG_INTERVAL_IN_MINITUES * 60;

/**
 * Cache IP limits with expiration time (with LIMIT key prefix)
 * @param ip
 * @param data
 * @param ttl
 */
const setRedisData = (ip: string, data: string, ttl: number) => {
  redisClient.set(`LIMIT_${ip}`, data, "EX", Math.round(ttl));
};

const ipLimiter = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!redisClient) {
      throw new Error("Redis client does not exist!");
    }
    // fetch saved data for the IP
    redisClient.get(`LIMIT_${req.ip}`, (err, record: any) => {
      if (err) throw err;

      const currentRequestTime = new Date().getTime();

      if (!record) {
        setRedisData(
          req.ip,
          JSON.stringify([
            {
              requestTime: currentRequestTime,
              requestCount: 1,
            },
          ]),
          LOG_INTERVAL_IN_SECONDS
        );
        next();
      } else {
        let data = JSON.parse(record);
        const intervalStartTime = new Date(
          currentRequestTime - LOG_INTERVAL_IN_SECONDS * 1000
        ).getTime();
        const requestsWithinInterval = data.filter(
          (entry: any) => entry.requestTime > intervalStartTime
        );

        const totalWindowRequestsCount = requestsWithinInterval.reduce(
          (accumulator: any, entry: any) => accumulator + entry.requestCount,
          0
        );
        // check cached request count withing the configured time interval
        if (totalWindowRequestsCount >= WINDOW_REQUEST_COUNT) {
          const msg = `You have exceeded the ${WINDOW_REQUEST_COUNT} requests in ${LOG_INTERVAL_IN_MINITUES} minitues limit`;
          logger.info(`ipLimiter ${req.ip} ${msg}`);
          res.status(400).json({
            message: msg,
          });
        } else {
          const [lastRequestLog] = data;

          // Calcluate new expiration time agains to the first saved request
          let TTL =
            (LOG_INTERVAL_IN_SECONDS * 1000 -
              (currentRequestTime -
                new Date(lastRequestLog.requestTime).getTime())) /
            1000;

          //  Increment the request count if time is not reach the configured time interval
          if (lastRequestLog.requestTime > intervalStartTime) {
            lastRequestLog.requestCount += 1;
            data = [lastRequestLog];
          } else {
            /**
             * This block will reach because of the auto key expiration in redis.
             * just added for if any edge cases
             */
            data = [{ requestTime: currentRequestTime, requestCount: 1 }];
            TTL = LOG_INTERVAL_IN_SECONDS;
          }
          setRedisData(req.ip, JSON.stringify(data), TTL);
          next();
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export default ipLimiter;
