import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  cuit?: string;

  @Column({ nullable: true })
  contact?: string;

  @Column({ nullable: true })
  type?: string; // Ej: 'luz', 'limpieza', 'otros'
}
