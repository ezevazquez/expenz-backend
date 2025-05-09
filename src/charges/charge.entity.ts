import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Unit } from '../units/unit.entity';
import { Settlement } from '../settlements/settlement.entity';

@Entity()
export class Charge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  amount: number;

  @Column({ default: 'pendiente' })
  status: 'pendiente' | 'pagado';

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  paidAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Unit, { onDelete: 'CASCADE' })
  unit: Unit;

  @ManyToOne(() => Settlement, (settlement) => settlement.charges, {
    onDelete: 'CASCADE',
  })
  settlement: Settlement;
}
