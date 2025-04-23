import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { Product } from '../products/entities/product.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  private async getCategoryById(id: Category['_id']): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      throw new GraphQLError(`Category with ID ${id} not found`, {
        extensions: {
          code: 'NOT_FOUND',
        },
      });
    }

    return category;
  }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const createdProduct = new this.categoryModel(createCategoryInput);

    return createdProduct.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: Category['_id']): Promise<Category> {
    return this.getCategoryById(id);
  }

  async update(
    id: Category['_id'],
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    await this.getCategoryById(id);

    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryInput, { new: true })
      .exec();
  }

  async remove(id: Category['_id']): Promise<Category> {
    await this.getCategoryById(id);

    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  async mapProductCategories(
    productsToCategories: {
      _id: Product['_id'];
      categories: Category['_id'][];
    }[],
  ): Promise<Category[][]> {
    const allCategoryIds = this._extractUniqueCategoryIds(productsToCategories);
    const categories = await this._fetchCategoriesByIds(allCategoryIds);
    const categoryMap = this._mapCategoriesById(categories);

    return this._mapProductsToCategories(productsToCategories, categoryMap);
  }

  private _extractUniqueCategoryIds(
    products: { categories: Category['_id'][] }[],
  ): string[] {
    return [
      ...new Set(
        products.flatMap((p) => p.categories.map((id) => id.toString())),
      ),
    ];
  }

  private async _fetchCategoriesByIds(ids: string[]): Promise<Category[]> {
    return this.categoryModel.find({ _id: { $in: ids } }).exec();
  }

  private _mapCategoriesById(categories: Category[]): Map<string, Category> {
    return new Map(categories.map((c) => [c._id.toString(), c]));
  }

  private _mapProductsToCategories(
    products: { categories: Category['_id'][] }[],
    categoryMap: Map<string, Category>,
  ): Category[][] {
    return products.map(({ categories }) =>
      categories
        .map((id) => categoryMap.get(id.toString()))
        .filter((category): category is Category => Boolean(category)),
    );
  }
}
