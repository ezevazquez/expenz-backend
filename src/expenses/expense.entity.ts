import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Building } from '../buildings/building.entity';
import { Provider } from '../providers/provider.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('float')
  amount: number;

  @Column()
  date: Date;

  @Column({ default: 'ordinario' })
  type: 'ordinario' | 'extraordinario';

  @ManyToOne(() => Building, { onDelete: 'CASCADE' })
  building: Building;

  @ManyToOne(() => Provider, { nullable: true })
  provider?: Provider;
}
