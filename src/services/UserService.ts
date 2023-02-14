import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

type UserRequest = {
  name: string;
  email: string;
  password: string;
};

type UserUpdateRequest = {
  id: string;
  name: string;
  email: string;
};

export class UserService {
  async create({ name, email, password }: UserRequest): Promise<User | Error> {
    const repo = AppDataSource.getRepository(User);

    if (await repo.findOne({ where: { email } })) {
      return new Error("E-mail already registered.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = repo.create({
      name,
      email,
      password: hashPassword,
    });

    await repo.save(user);

    return user;
  }

  async getAll() {
    const repo = AppDataSource.getRepository(User);

    const users = await repo.find({
      select: { id: true, name: true, email: true, created_at: true },
    });

    return users;
  }

  async delete(id: string) {
    const repo = AppDataSource.getRepository(User);

    if (!(await repo.findOne({ where: { id } }))) {
      return new Error("User does not exist.");
    }

    await repo.delete(id);
  }

  async update({ id, name, email }: UserUpdateRequest) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { id } });

    if (!user) {
      return new Error("User does not exist.");
    }

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;

    await repo.save(user);

    return user;
  }
}
