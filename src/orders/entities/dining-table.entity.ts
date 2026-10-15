import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('dining_tables')
export class DiningTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  number!: number;

  @Column()
  capacity!: number;

  @OneToMany(() => OrderEntity, (order) => order.diningTable)
  orders!: OrderEntity[];
}
