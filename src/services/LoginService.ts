import { User } from "../entities/User";
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type LoginRequest = {
  email: string;
  password: string;
};

export class LoginService {
  async login({ email, password }: LoginRequest) {
    const repo = AppDataSource.getRepository(User);

    const user = repo.findOne({ where: { email } });

    if (!user) {
      return new Error("Invalid e-mail or password.");
    }

    const verifyPassword = await bcrypt.compare(
      password,
      (
        await user
      ).password
    );

    if (!verifyPassword) {
      return new Error("Invalid e-mail or password.");
    }

    const token = jwt.sign({ id: (await user).id }, process.env.JWT_PASS, {
      expiresIn: "8h",
    });

    const userLogin = {
      id: (await user).id,
      name: (await user).name,
      email: (await user).email,
    };

    return { userLogin, token };
  }
}
