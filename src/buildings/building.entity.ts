import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Unit } from 'src/units/unit.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Building {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Unit, (unit) => unit.building)
  units: Unit[];

  @ManyToOne(() => User, (user) => user.buildings, { eager: true })
  admin: User;

  @Column({ type: 'decimal', default: 0 })
  initialBalance: number;
}
