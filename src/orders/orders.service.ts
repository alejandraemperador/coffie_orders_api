import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  // private orders: Order[] = [
  //{ id: 1, customer: 'Laura', item: 'Cafe latte', status: 'pending' },
  //{ id: 2, customer: 'Mateo', item: 'Sandwich', status: 'ready' },
  //];

  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.customerId,
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${createOrderDto.customerId} was not found`,
      );
    }

    const order = this.ordersRepository.create({
      item: createOrderDto.item,
      quantity: createOrderDto.quantity,
      status: 'pending',
      customer,
    });

    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      relations: {
        customer: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }
  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.findOne(id);

    this.ordersRepository.merge(order, updateOrderDto);

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);

    return this.ordersRepository.remove(order);
  }
}
