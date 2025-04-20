import { Module } from '@nestjs/common';
import { OrdersService as OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { ProductOrdersModule } from '../products-order/produts-orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductOrdersModule,
  ],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
