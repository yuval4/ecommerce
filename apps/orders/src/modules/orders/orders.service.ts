import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const createdProduct = new this.orderModel(createOrderInput);

    return createdProduct.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: Order['_id']): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async update(
    id: Order['_id'],
    updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(id, updateOrderInput, { new: true })
      .exec();
  }

  async remove(id: Order['_id']): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
