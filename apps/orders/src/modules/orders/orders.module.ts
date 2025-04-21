import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductOrdersModule } from '../products-order/produts-orders.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductOrdersModule,
  ],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
