import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Building } from '../buildings/building.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin' | 'superuser';

  @OneToMany(() => Building, (building) => building.admin)
  buildings: Building[];
}
