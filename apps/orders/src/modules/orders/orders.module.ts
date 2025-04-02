import { Module } from '@nestjs/common';
import { OrdersService as OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';

@Module({
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
