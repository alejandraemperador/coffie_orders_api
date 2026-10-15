import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { DiningTable } from './entities/dining-table.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, OrderEntity, DiningTable]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
