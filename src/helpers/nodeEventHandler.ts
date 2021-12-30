import { logger } from "./logger";

/**
 * this is done because when an error occurs, its possible that
 * the next processes will handle a 'crazy' (uncontrolled) status.
 */
process.on("unhandledRejection", (err: any) => {
  logger.error(err.message || JSON.stringify(err));
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error(err.message || JSON.stringify(err));
  process.exit(1);
});

process.on("SIGINT", () => {
  logger.info("Shutting down server! Bye bye :)");
  process.exit(0);
});
