import { Request, Response } from "express";
import { PlaylistService } from "../services/PlaylistService";

export class PlaylistController {
  async addVideo(request: Request, response: Response) {
    const { video_id } = request.body;
    const user_id = request.user.id;

    const service = new PlaylistService();

    const result = await service.addVideo({ user_id, video_id });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async getUserPlaylist(request: Request, response: Response) {
    const user_id = request.user.id;

    const service = new PlaylistService();

    const result = await service.getUserPlaylist(user_id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async deleteVideo(request: Request, response: Response) {
    const user_id = request.user.id;
    const { video_id } = request.body;

    const service = new PlaylistService();

    const result = await service.deleteVideo(user_id, video_id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}
