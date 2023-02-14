import { AppDataSource } from "../database/data-source";
import { Category } from "../entities/Category";
import { Video } from "../entities/Video";

type VideoRequest = {
  name: string;
  description: string;
  duration: number;
  category_id: string;
};

type VideoUpdateRequest = {
  id: string;
  name: string;
  description: string;
  duration: number;
};

export class VideoService {
  async create({
    name,
    description,
    duration,
    category_id,
  }: VideoRequest): Promise<Video | Error> {
    const repo = AppDataSource.getRepository(Video);
    const repoCategory = AppDataSource.getRepository(Category);

    if (!(await repoCategory.findOne({ where: { id: category_id } }))) {
      return new Error("Category does not exist.");
    }

    const video = repo.create({
      name,
      description,
      duration,
      category_id,
    });

    await repo.save(video);

    return video;
  }

  async getAll() {
    const repo = AppDataSource.getRepository(Video);

    const videos = repo.find({
      relations: ["category"],
    });

    return videos;
  }

  async delete(id: string) {
    const repo = AppDataSource.getRepository(Video);

    if (!(await repo.findOne({ where: { id } }))) {
      return new Error("Video does not exist.");
    }

    await repo.delete(id);
  }

  async update({ id, name, description, duration }: VideoUpdateRequest) {
    const repo = AppDataSource.getRepository(Video);

    const video = await repo.findOne({ where: { id } });

    if (!video) {
      return new Error("Video does not exist.");
    }

    video.name = name ? name : video.name;
    video.description = description ? description : video.description;
    video.duration = duration ? duration : video.duration;

    await repo.save(video);

    return video;
  }
}
