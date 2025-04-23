import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Order } from '../orders/entities/order.entity';
import { ProductsOrder } from '../products-order/entities/products-order.entity';
import { ProductsOrdersService } from '../products-order/products-orders.service';
import { IDataloaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(private readonly productsOrdersService: ProductsOrdersService) {}

  getLoaders(): IDataloaders {
    const productsOrdersLoader = this._createProductsOrdersLoader();

    return {
      productsOrdersLoader,
    };
  }

  private _createProductsOrdersLoader() {
    return new DataLoader<Order['id'], ProductsOrder[]>(async (orderIds) => {
      const productsOrders = await this.productsOrdersService.findByOrderIds(
        orderIds as string[],
      );

      const groupedProductOrders = new Map<string, ProductsOrder[]>();
      orderIds.forEach((id) => groupedProductOrders.set(id.toString(), []));

      for (const item of productsOrders) {
        const key = item.orderId.toString();
        if (!groupedProductOrders.has(key)) {
          groupedProductOrders.set(key, []);
        }
        groupedProductOrders.get(key)!.push(item);
      }

      return orderIds.map(
        (id) => groupedProductOrders.get(id.toString()) ?? [],
      );
    });
  }
}
