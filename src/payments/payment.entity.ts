import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Charge } from '../charges/charge.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  amount: number;

  @Column()
  date: Date;

  @Column()
  method: 'efectivo' | 'transferencia' | 'tarjeta';

  @Column({ nullable: true })
  reference?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Charge, { onDelete: 'CASCADE' })
  charge: Charge;
}
