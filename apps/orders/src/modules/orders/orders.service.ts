import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { ProductsOrdersService } from '../products-order/products-orders.service';
import { ProductsOrder } from '../products-order/entities/products-order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly productsOrdersService: ProductsOrdersService,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderInput);
    // TODO transaction
    await createdOrder.save();

    try {
      const products = await this.productsOrdersService.createMany(
        createdOrder._id,
        createOrderInput.productOrders,
      );
      const createdOrderTyped = createdOrder.toObject() as Order;
      const a: Order = { ...createdOrderTyped, productsOrder: products };

      // const a: Order = { ...createdOrder, productsOrder: products };
      return a;
    } catch (error) {
      await this.orderModel.findByIdAndDelete(createdOrder._id).exec();
      throw error;
    }
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

  async findProductsOrder(id: Order['_id']): Promise<ProductsOrder[]> {
    return this.productsOrdersService.findByOrderId(id);
  }
}
