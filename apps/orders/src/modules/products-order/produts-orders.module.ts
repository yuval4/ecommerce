import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductsOrder,
  ProductsOrderSchema,
} from './entities/products-order.entity';
import { ProductsOrdersResolver } from './products-orders.resolver';
import { ProductsOrdersService } from './products-orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductsOrder.name, schema: ProductsOrderSchema },
    ]),
  ],
  providers: [ProductsOrdersResolver, ProductsOrdersService],
})
export class ProductOrdersModule {}
