import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Video } from "./Video";

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

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
