import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
// import { add } from '@repo/types';

@Injectable()
export class OrdersService {
  create(createOrderInput: CreateOrderInput) {
    return 'This action adds a new order';
  }

  findAll() {
    return [{ id: 11 }, { id: 999 }];
    // return [{ id: add(1, 9) }, { id: 999 }];
  }

  findOne(id: number) {
    return { id: 11 };
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
