import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable({ scope: Scope.REQUEST })
export class ProductDataLoader {
  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  createLoader() {
    return new DataLoader<number, Product[]>(
      async (productsIds: Product['_id'][]) => {
        const categories = await this.categoriesService.findAll();
        const users = await Promise.all(
          productsIds.map((id) => this.productService.findFriends(id)),
        );
        return productsIds.map(
          (id) => users.find((user) => user.id === id).friends,
        );
      },
    );
  }
}
