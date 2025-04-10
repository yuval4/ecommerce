import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/categories.entity';
import { ProductDataLoader } from './products.dataloader';

// TODO handle empty response from DB

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private dataLoader: ProductDataLoader,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const createdProduct = new this.productModel(createProductInput);

    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: Product['_id']): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: Product['_id'],
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductInput, { new: true })
      .exec();
  }

  async remove(id: Product['_id']): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async findCategoriesByProductId(id: Product['_id']): Promise<Category[]> {
    return this.dataLoader.createLoader().load(id);
  }
}
