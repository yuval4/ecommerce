import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/categories.entity';
import { Product } from '../products/entities/product.entity';
import { IDataloaders } from './dataloader.interface';
import { ProductsService } from '../products/products.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  getLoaders(): IDataloaders {
    const categoriesLoader = this._createCategoriesLoader();
    const productsLoader = this._createProductsLoader();

    return {
      categoriesLoader,
      productsLoader,
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

      return this.categoriesService.mapProductCategories(productsToIds);
    });
  }

  private _createProductsLoader() {
    return new DataLoader<Product['_id'], Product>(async (productIds) => {
      const products = await this.productsService.findByIds(
        productIds as string[],
      );

      const productMap = new Map(
        products.map((product) => [product._id.toString(), product]),
      );
      return productIds.map((id) => productMap.get(id.toString()));
    });
  }
}
