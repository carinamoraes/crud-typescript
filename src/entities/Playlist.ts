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

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  video_id: string;

  @ManyToOne(() => Video)
  @JoinColumn({ name: "video_id" })
  video: Video;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
