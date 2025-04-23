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
      { id: Product['id']; categories: Category['id'][] },
      Category[]
    >(async (products) => {
      const productsToIds: {
        id: Product['id'];
        categories: Category['id'][];
      }[] = products.map((product) => ({
        id: product.id,
        categories: product.categories,
      }));

      return this.categoriesService.mapProductCategories(productsToIds);
    });
  }

  private _createProductsLoader() {
    return new DataLoader<Product['id'], Product>(async (productIds) => {
      const products = await this.productsService.findByIds(
        productIds as string[],
      );

      const productMap = new Map(
        products.map((product) => [product.id.toString(), product]),
      );
      return productIds.map((id) => productMap.get(id.toString()));
    });
  }
}
