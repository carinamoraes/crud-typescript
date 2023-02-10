import { AppDataSource } from "../database/data-source";
import { Category } from "../entities/Category";

type CategoryRequest = {
  name: string;
  description: string;
};

type CategoryUpdateRequest = {
  id: string;
  name: string;
  description: string;
};

export class CategoryService {
  async create({
    name,
    description,
  }: CategoryRequest): Promise<Category | Error> {
    const repo = AppDataSource.getRepository(Category);

    if (await repo.findOne({ where: { name } })) {
      return new Error("Category already exists.");
    }

    const category = repo.create({
      name,
      description,
    });

    await repo.save(category);

    return category;
  }

  async getAll() {
    const repo = AppDataSource.getRepository(Category);

    const categories = repo.find();

    return categories;
  }

  async delete(id: string) {
    const repo = AppDataSource.getRepository(Category);

    if (!(await repo.findOne({ where: { id } }))) {
      return new Error("Category does not exists.");
    }

    await repo.delete(id);
  }

  async update({ id, name, description }: CategoryUpdateRequest) {
    const repo = AppDataSource.getRepository(Category);

    const category = await repo.findOne({ where: { id } });

    if (!category) {
      return new Error("Category does not exists.");
    }

    category.name = name ? name : category.name;
    category.description = description ? description : category.description;

    await repo.save(category);

    return category;
  }
}
