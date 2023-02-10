import { Request, Response } from "express";
import { VideoService } from "../services/VideoService";

export class VideoController {
  async create(request: Request, response: Response) {
    const { name, description, duration, category_id } = request.body;

    const service = new VideoService();

    const result = await service.create({
      name,
      description,
      duration,
      category_id,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async getAll(request: Request, response: Response) {
    const service = new VideoService();

    const videos = await service.getAll();

    return response.json(videos);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const service = new VideoService();

    const result = await service.delete(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description, duration } = request.body;

    const service = new VideoService();
    const result = await service.update({ id, name, description, duration });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
