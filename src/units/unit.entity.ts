/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Building } from '../buildings/building.entity';

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
}
