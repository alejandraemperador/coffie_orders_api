import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { DiningTable } from './dining-table.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  item!: string;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: 'pending' | 'ready';

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;

  @ManyToOne(() => DiningTable, (diningTable) => diningTable.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'dining_table_id' })
  diningTable!: DiningTable;
}
