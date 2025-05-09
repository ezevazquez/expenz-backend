import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Building } from '../buildings/building.entity';
import { Charge } from '../charges/charge.entity';

@Entity()
export class Settlement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  period: string; // formato: "2025-05"

  @ManyToOne(() => Building, { onDelete: 'CASCADE' })
  building: Building;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Charge, (charge) => charge.settlement)
  charges: Charge[];
}
