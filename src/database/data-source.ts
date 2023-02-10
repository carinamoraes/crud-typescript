import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { Video } from "../entities/Video";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "12345",
  database: "db_typescript",
  migrations: ["src/database/migrations/*.ts"],
  entities: [Category, Video],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
