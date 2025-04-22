import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { ProductOrdersModule } from '../products-order/produts-orders.module';

@Module({
  imports: [ProductOrdersModule],
  exports: [DataloaderService],
  providers: [DataloaderService],
})
export class DataloaderModule {}
