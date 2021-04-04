import { createLogger, format, transports } from "winston";
import { Options as morganOptions } from "morgan";
import { Request, Response } from "express";

const { combine, timestamp, label, prettyPrint } = format;

const options = {
  file: {
    level: "info",
    filename: "combined.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: process.env.NODE_ENV === "development" ? "debug" : "error",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  format: combine(label({ label: "right meow!" }), timestamp(), prettyPrint()),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: "errors.log",
      level: "error",
    }),
    new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export const morganStream: morganOptions<Request, Response> = {
  stream: {
    write: function (message: string) {
      logger.info(message.trim());
    },
  },
};

export default logger;
