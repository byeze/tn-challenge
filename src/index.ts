import express from "express";
import { createDbConnection } from "./database/mysql.db";
require("./helpers/nodeEventHandler");
import { expressErrorHandler } from "./helpers/expressErrorHandler";
import { expressLogger, logger } from "./helpers/logger";
import checksRoutes from "./routes/checks";
import tasksRoutes from "./routes/tasks";
import dotenv from "dotenv";
import { entities } from "./entities";

dotenv.config();

const app = express();

// setup middlewares
app.use(express.json());
app.use(expressLogger());

// setup routes
app.use(checksRoutes);
app.use(tasksRoutes);

// setup error handler middleware
app.use(expressErrorHandler());

// setup server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await createDbConnection(entities);

  logger.info(`Server listening on port ${port}`);
});
