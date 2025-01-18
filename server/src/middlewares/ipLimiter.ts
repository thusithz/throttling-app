import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import { RedisClientType } from '@redis/client';
import logger from './logger';

const RATE_LIMIT = 100;
const WINDOW_SIZE = 60; // seconds

const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://0.0.0.0:6379',
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisClient.connect().catch(logger.error);

export const ipLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!redisClient.isOpen) {
      logger.warn('Redis client not connected, skipping rate limit');
      return next();
    }

    const ip = req.ip || req.socket.remoteAddress || '';
    if (!ip) {
      logger.warn('No IP address found');
      return next();
    }

    const key = `rate_limit:${ip}`;
    const requests = await redisClient.get(key);
    const requestCount = requests ? parseInt(requests) : 0;

    if (requestCount >= RATE_LIMIT) {
      logger.warn(`Rate limit exceeded for IP: ${ip}`);
      return res.status(429).json({
        message: 'Too many requests',
        retryAfter: WINDOW_SIZE,
      });
    }

    await redisClient.set(key, String(requestCount + 1), { EX: WINDOW_SIZE });
    logger.info(`Request ${requestCount + 1}/${RATE_LIMIT} from IP: ${ip}`);
    next();
  } catch (error) {
    logger.error('Rate limiting error:', error);
    next(error);
  }
};
