import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/categories.entity';
import { Product } from '../products/entities/product.entity';

// TODO handle empty response from DB

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const createdProduct = new this.categoryModel(createCategoryInput);

    return createdProduct.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: Category['_id']): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async update(
    id: Category['_id'],
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryInput, { new: true })
      .exec();
  }

  async remove(id: Category['_id']): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  private _mapResultToIds(
    productsIds: readonly Product['_id'][],
    categories: Category[],
  ) {
    return productsIds.map(
      (id) =>
        categories.filter((category: Category) => category._id === id) || null,
    );
  }

  // async findAllByProductsIds(
  //   productsIds: Product['_id'][],
  // ): Promise<Category[][] | any> {
  //   const categories = await this.categoryModel.find().exec();

  //   if (!categories || categories.length === 0) {
  //     console.warn('No categories found for the provided product IDs');
  //     return [];
  //   }
  //   const mappedResults = this._mapResultToIds(productsIds, categories);

  //   return mappedResults;
  // }

  // TODO export product to categories to type

  async findAllByProductsIds(
    productsToCatecories: {
      _id: Product['_id'];
      categories: Category['_id'][];
    }[],
  ): Promise<Category[][]> {
    const categoryIds = [
      ...new Set(productsToCatecories.flatMap((product) => product.categories)),
    ];

    const categories = await this.categoryModel
      .find({ _id: { $in: categoryIds } })
      .exec();

    return productsToCatecories.map((product) =>
      product.categories
        .map(
          (categoryId) =>
            categories.find((category) => {
              return category._id.toString() === categoryId.toString();
            }) || null,
        )
        .filter((category) => category !== null),
    );
  }
}
