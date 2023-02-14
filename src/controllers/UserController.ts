import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const service = new UserService();

    const result = await service.create({ name, email, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async getAll(request: Request, response: Response) {
    const service = new UserService();

    const users = await service.getAll();

    return response.json(users);
  }
}
