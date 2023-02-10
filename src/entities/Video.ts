import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";

@Entity("videos")
export class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category) // Tipo do relacionamento, vários vídeos para uma categoria
  @JoinColumn({ name: "category_id" }) // Coluna que estou referenciando na tabela de Videos
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  // Caso o campo id não venha preenchido, significa que é uma inserção no banco. Sendo assim,
  // o campo id é preenchido com um indentificador único gerado pelo pacote 'uuid'.
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
