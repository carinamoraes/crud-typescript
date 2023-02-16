import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { Video } from "../entities/Video";
import "dotenv/config";
import { Playlist } from "../entities/Playlist";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrations: ["src/database/migrations/*.ts"],
  entities: [Category, Video, User, Playlist],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
