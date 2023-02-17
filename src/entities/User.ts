import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Playlist } from "./Playlist";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlist: Playlist[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
