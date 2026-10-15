import { OneToMany } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt!: Date;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders!: OrderEntity[];
}
