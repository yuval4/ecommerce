import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/categories.entity';
import { Product } from '../products/entities/product.entity';
import { IDataloaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(private readonly categoriesService: CategoriesService) {}

  getLoaders(): IDataloaders {
    const categoriesLoader = this._createCategoriesLoader();
    return {
      categoriesLoader,
    };
  }

  private _createCategoriesLoader() {
    return new DataLoader<
      { _id: Product['_id']; categories: Category['_id'][] },
      Category[]
    >(async (products) => {
      const productsToIds: {
        _id: Product['_id'];
        categories: Category['_id'][];
      }[] = products.map((product) => ({
        _id: product._id,
        categories: product.categories,
      }));

      return this.categoriesService.findAllByProductsIds(productsToIds);
    });
  }
}
