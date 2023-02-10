import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("categories")
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

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
