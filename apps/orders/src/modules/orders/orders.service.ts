import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsOrder } from '../products-order/entities/products-order.entity';
import { ProductsOrdersService } from '../products-order/products-orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly productsOrdersService: ProductsOrdersService,
  ) {}

  private async getOrderById(id: Order['_id']): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new ApolloError(`Order with ID ${id} not found`, 'NOT_FOUND');
    }

    return order;
  }

  // TODO
  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderInput);
    // TODO transaction
    await createdOrder.save();

    try {
      await this.productsOrdersService.createMany(
        createdOrder._id,
        createOrderInput.productOrders,
      );

      return await this.findOne(createdOrder._id);
    } catch (error) {
      await this.orderModel.findByIdAndDelete(createdOrder._id).exec();
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: Order['_id']): Promise<Order> {
    return this.getOrderById(id);
  }

  async update(
    id: Order['_id'],
    updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    await this.getOrderById(id);

    return this.orderModel
      .findByIdAndUpdate(id, updateOrderInput, { new: true })
      .exec();
  }

  async remove(id: Order['_id']): Promise<Order> {
    await this.getOrderById(id);

    return this.orderModel.findByIdAndDelete(id).exec();
  }

  // TODO
  async findProductsOrder(id: Order['_id']): Promise<ProductsOrder[]> {
    return this.productsOrdersService.findByOrderId(id);
  }
}
