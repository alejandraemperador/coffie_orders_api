import { Injectable } from '@nestjs/common';
import { Order } from './orders.interface';

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    { id: 1, customer: 'Laura', item: 'Cafe latte', status: 'pending' },
    { id: 2, customer: 'Mateo', item: 'Sandwich', status: 'ready' },
  ];

  getAllOrders(): Order[] {
    return this.orders;
  }

  deleteAllOrders(): Order[] {
    return (this.orders = []);
  }
}
