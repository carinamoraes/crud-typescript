import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

export class LoginController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const service = new LoginService();

    const result = await service.login({ email, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async getProfile(request: Request, response: Response) {
    return response.json(request.user);
  }
}
