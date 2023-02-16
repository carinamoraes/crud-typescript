import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";
import { LoginController } from "./controllers/LoginController";
import { PlaylistController } from "./controllers/PlaylistController";
import { UserController } from "./controllers/UserController";
import { VideoController } from "./controllers/VideoController";
import { authMiddleware } from "./middleware/authMiddleware";

const routes = Router();

//Authentication
routes.post("/login", new LoginController().login);
routes.get("/profile", authMiddleware, new LoginController().getProfile);

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

//Playlist
routes.post("/playlist", authMiddleware, new PlaylistController().addVideo);
routes.get(
  "/playlist",
  authMiddleware,
  new PlaylistController().getUserPlaylist
);
routes.delete(
  "/playlist",
  authMiddleware,
  new PlaylistController().deleteVideo
);

export { routes };
