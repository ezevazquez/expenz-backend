import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Building } from '../buildings/building.entity';
import { User } from '../users/user.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column('float')
  squareMeters: number;

  @ManyToOne(() => Building, (building) => building.units, {
    onDelete: 'CASCADE',
  })
  building: Building;

  @ManyToOne(() => User, { nullable: true })
  owner: User;

  @ManyToOne(() => User, { nullable: true })
  tenant: User;
}
