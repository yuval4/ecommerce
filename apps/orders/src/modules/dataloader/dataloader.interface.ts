import * as DataLoader from 'dataloader';
import { ProductsOrder } from '../products-order/entities/products-order.entity';
import { Order } from '../orders/entities/order.entity';

export interface IDataloaders {
  productsOrdersLoader: DataLoader<Order['_id'], ProductsOrder[]>;
}
