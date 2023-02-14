import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";
import { LoginController } from "./controllers/LoginController";
import { UserController } from "./controllers/UserController";
import { VideoController } from "./controllers/VideoController";

const routes = Router();

// Categories
routes.post("/categories", new CategoryController().create);
routes.get("/categories", new CategoryController().getAll);
routes.delete("/categories/:id", new CategoryController().delete);
routes.put("/categories/:id", new CategoryController().update);

//Videos
routes.post("/videos", new VideoController().create);
routes.get("/videos", new VideoController().getAll);
routes.delete("/videos/:id", new VideoController().delete);
routes.put("/videos/:id", new VideoController().update);

//Users
routes.post("/users", new UserController().create);
routes.get("/users", new UserController().getAll);

//Login
routes.post("/login", new LoginController().login);

export { routes };
