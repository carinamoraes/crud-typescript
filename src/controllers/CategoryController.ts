import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const service = new CategoryService();

    const result = await service.create({ name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async getAll(request: Request, response: Response) {
    const service = new CategoryService();

    const categories = await service.getAll();

    return response.json(categories);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const service = new CategoryService();

    const result = await service.delete(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description } = request.body;

    const service = new CategoryService();
    const result = await service.update({ id, name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
