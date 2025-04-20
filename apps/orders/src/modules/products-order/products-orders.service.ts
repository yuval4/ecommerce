import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProductsOrderInput } from './dto/create-products-order.input';
import { UpdateProductsOrderInput } from './dto/update-products-order.input';
import { ProductsOrder } from './entities/products-order.entity';

@Injectable()
export class ProductsOrdersService {
  constructor(
    @InjectModel(ProductsOrder.name)
    private productsOrderModel: Model<ProductsOrder>,
  ) {}

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
    return this.productsOrderModel.findById(id).exec();
  }

  update(
    id: ProductsOrder['_id'],
    updateProductsOrderInput: UpdateProductsOrderInput,
  ): Promise<ProductsOrder> {
    return this.productsOrderModel
      .findByIdAndUpdate(id, updateProductsOrderInput, { new: true })
      .exec();
  }

  async remove(id: ProductsOrder['_id']): Promise<ProductsOrder> {
    return this.productsOrderModel.findByIdAndDelete(id).exec();
  }

  async createMany(
    orderId: string,
    products: CreateProductsOrderInput[],
  ): Promise<ProductsOrder[]> {
    const productsOrders = products.map((product) => ({
      ...product,
      orderId,
      productId: new mongoose.Types.ObjectId(product.productId),
    }));
    // TODO check
    const insertedProductsOrders =
      await this.productsOrderModel.insertMany(productsOrders);

    const ids = insertedProductsOrders.map((productOrder) => productOrder._id);

    // find by ids and populate
    const populatedProductsOrders = await this.productsOrderModel
      .find({ _id: { $in: ids } })
      // .populate('productId')
      .exec();

    return populatedProductsOrders.map((productOrder) =>
      productOrder.toObject(),
    );
  }

  async findByOrderId(orderId: string): Promise<ProductsOrder[]> {
    return this.productsOrderModel.find({ orderId }).exec();
  }
}
