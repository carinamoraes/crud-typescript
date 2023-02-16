import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  const repo = AppDataSource.getRepository(User);

  if (!authorization) {
    return new Error("Access denied.");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS) as JwtPayload;

  const user = await repo.findOne({
    where: { id },
    select: { id: true, name: true, email: true, created_at: true },
  });

  if (!user) {
    return new Error("Access denied.");
  }

  request.user = user;

  next();
};
