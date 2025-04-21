import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
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
    @InjectConnection() private readonly connection: Connection,
  ) {}

  private async getOrderById(id: Order['_id']): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new ApolloError(`Order with ID ${id} not found`, 'NOT_FOUND');
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
        createdOrder._id,
        createOrderInput.productOrders,
        session,
      );

      await session.commitTransaction();

      return this.findOne(createdOrder._id);
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

  async findProductsOrder(id: Order['_id']): Promise<ProductsOrder[]> {
    return this.productsOrdersService.findByOrderId(id);
  }
}
