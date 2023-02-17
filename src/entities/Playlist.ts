import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Video } from "./Video";
import { v4 as uuid } from "uuid";

@Entity()
export class Playlist {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  video_id: string;

  @ManyToOne(() => User, (user) => user.playlist)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Video, (video) => video.playlist)
  @JoinColumn({ name: "video_id" })
  video: Video;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
