import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Connection, Model } from 'mongoose';
import { ProductsOrdersService } from '../products-order/products-orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly productsOrdersService: ProductsOrdersService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  private async getOrderById(id: Order['id']): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new GraphQLError(`Order with ID ${id} not found`, {
        extensions: {
          code: 'NOT_FOUND',
        },
      });
    }

    return order;
  }

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const createdOrder = new this.orderModel(createOrderInput);
      await createdOrder.save({ session });

      await this.productsOrdersService.createMany(
        createdOrder.id,
        createOrderInput.productOrders,
        session,
      );

      await session.commitTransaction();

      return this.findOne(createdOrder.id);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: Order['id']): Promise<Order> {
    return this.getOrderById(id);
  }

  async update(
    id: Order['id'],
    updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    await this.getOrderById(id);

    return this.orderModel
      .findByIdAndUpdate(id, updateOrderInput, { new: true })
      .exec();
  }

  async remove(id: Order['id']): Promise<Order> {
    await this.getOrderById(id);

    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
