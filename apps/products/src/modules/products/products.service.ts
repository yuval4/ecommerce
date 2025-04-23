import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductStatus } from '@repo/types';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  private async getActiveProductById(id: Product['_id']): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new GraphQLError(`Product with ID ${id} not found`, {
        extensions: {
          code: 'NOT_FOUND',
        },
      });
    }

    if (product.status === ProductStatus.DISABLED) {
      throw new GraphQLError(`Product with ID ${id} is disabled`, {
        extensions: {
          code: 'USER_INPUT_ERROR',
        },
      });
    }

    return product;
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const createdProduct = new this.productModel(createProductInput);

    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({ status: ProductStatus.ACTIVE }).exec();
  }

  async findOne(id: Product['_id']): Promise<Product> {
    return this.getActiveProductById(id);
  }

  async update(
    id: Product['_id'],
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    await this.getActiveProductById(id);

    return this.productModel.findByIdAndUpdate(id, updateProductInput, {
      new: true,
    });
  }

  async remove(id: Product['_id']): Promise<Product> {
    await this.getActiveProductById(id);

    return this.productModel.findByIdAndUpdate(
      id,
      { status: ProductStatus.DISABLED },
      { new: true },
    );
  }

  async findByIds(ids: Product['_id'][]): Promise<Product[]> {
    return this.productModel
      .find({ _id: { $in: ids }, status: ProductStatus.ACTIVE })
      .exec();
  }
}
