import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession, Model } from 'mongoose';
import { CreateProductsOrderInput } from './dto/create-products-order.input';
import { UpdateProductsOrderInput } from './dto/update-products-order.input';
import { ProductsOrder } from './entities/products-order.entity';
import { Order } from '../orders/entities/order.entity';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class ProductsOrdersService {
  constructor(
    @InjectModel(ProductsOrder.name)
    private productsOrderModel: Model<ProductsOrder>,
  ) {}

  private async getProductOrderById(
    id: ProductsOrder['_id'],
  ): Promise<ProductsOrder> {
    const productOrder = await this.productsOrderModel.findById(id).exec();

    if (!productOrder) {
      throw new ApolloError(
        `productOrder with ID ${id} not found`,
        'NOT_FOUND',
      );
    }

    return productOrder;
  }

  create(
    createProductsOrderInput: CreateProductsOrderInput,
  ): Promise<ProductsOrder> {
    const createdProductsOrder = new this.productsOrderModel(
      createProductsOrderInput,
    );

    return createdProductsOrder.save();
  }

  findAll(): Promise<ProductsOrder[]> {
    return this.productsOrderModel.find().exec();
  }

  findOne(id: ProductsOrder['_id']): Promise<ProductsOrder> {
    return this.getProductOrderById(id);
  }

  async update(
    id: ProductsOrder['_id'],
    updateProductsOrderInput: UpdateProductsOrderInput,
  ): Promise<ProductsOrder> {
    await this.getProductOrderById(id);

    return this.productsOrderModel
      .findByIdAndUpdate(id, updateProductsOrderInput, { new: true })
      .exec();
  }

  async remove(id: ProductsOrder['_id']): Promise<ProductsOrder> {
    await this.getProductOrderById(id);

    return this.productsOrderModel.findByIdAndDelete(id).exec();
  }
  async createMany(
    orderId: Order['_id'],
    products: CreateProductsOrderInput[],
    session: ClientSession,
  ): Promise<ProductsOrder[]> {
    const productsOrders = products.map((product) => ({
      ...product,
      orderId,
      productId: new mongoose.Types.ObjectId(product.productId),
    }));

    const inserted = await this.productsOrderModel.insertMany(productsOrders, {
      session,
    });

    return inserted;
  }

  async findByOrderIds(orderIds: string[]): Promise<ProductsOrder[]> {
    return this.productsOrderModel.find({ orderId: { $in: orderIds } }).exec();
  }
}
