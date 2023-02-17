import { AppDataSource } from "../database/data-source";
import { Playlist } from "../entities/Playlist";
import { Video } from "../entities/Video";

type PlaylistRequest = {
  user_id: string;
  video_id: string;
};

export class PlaylistService {
  async addVideo({
    user_id,
    video_id,
  }: PlaylistRequest): Promise<Playlist | Error> {
    const repo = AppDataSource.getRepository(Playlist);

    const videoRepo = AppDataSource.getRepository(Video);

    if (!(await videoRepo.findOneBy({ id: video_id }))) {
      return new Error("Video does not exist.");
    }

    if (await repo.findOne({ where: { user_id, video_id } })) {
      return new Error("Video already added.");
    }

    const playlist = repo.create({
      user_id,
      video_id,
    });

    await repo.save(playlist);

    return playlist;
  }

  async getUserPlaylist(user_id: string) {
    const repo = AppDataSource.getRepository(Playlist);

    const playlist = await repo.find({
      where: { user_id },
      relations: ["video"],
    });

    if (!playlist) {
      return new Error("Empty playlist.");
    }

    return playlist;
  }

  async deleteVideo(user_id: string, video_id: string) {
    const repo = AppDataSource.getRepository(Playlist);

    if (
      !(await repo.findOne({
        where: { user_id, video_id },
      }))
    ) {
      return new Error("Video is not in the playlist.");
    }

    await repo.delete({ user_id, video_id });
  }
}
