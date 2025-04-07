import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/categories.entity';

// TODO handle empty response from DB

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private productModel: Model<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const createdProduct = new this.productModel(createCategoryInput);

    return createdProduct.save();
  }

  async findAll(): Promise<Category[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: Category['_id']): Promise<Category> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: Category['_id'],
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.productModel
      .findByIdAndUpdate(id, updateCategoryInput, { new: true })
      .exec();
  }

  async remove(id: Category['_id']): Promise<Category> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
