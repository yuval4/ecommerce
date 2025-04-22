import * as DataLoader from 'dataloader';
import { Category } from '../categories/entities/categories.entity';
import { Product } from '../products/entities/product.entity';

export interface IDataloaders {
  categoriesLoader: DataLoader<
    {
      _id: Product['_id'];
      categories: Category['_id'][];
    },
    Category[]
  >;
  productsLoader: DataLoader<Product['_id'], Product>;
}
