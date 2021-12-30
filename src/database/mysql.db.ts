import { createConnection } from "typeorm";

export function createDbConnection(entities: any[]) {
  const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_PORT } =
    process.env;

  const connection = createConnection({
    type: "mysql",
    host: DB_HOST,
    port: parseInt(DB_PORT) || 3306,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [...entities, "dist/entities/*.entity.js"],
    synchronize: true,
  });

  return connection;
}
