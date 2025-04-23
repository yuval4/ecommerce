import * as DataLoader from 'dataloader';
import { Category } from '../categories/entities/categories.entity';
import { Product } from '../products/entities/product.entity';

export interface IDataloaders {
  categoriesLoader: DataLoader<
    {
      id: Product['id'];
      categories: Category['id'][];
    },
    Category[]
  >;
  productsLoader: DataLoader<Product['id'], Product>;
}
