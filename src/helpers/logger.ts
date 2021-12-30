import winston from "winston";
import expressWinston from "express-winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "tn-challenge" },
  transports: [new winston.transports.Console()],
});

export const expressLogger = () => {
  return expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json()),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  });
};
