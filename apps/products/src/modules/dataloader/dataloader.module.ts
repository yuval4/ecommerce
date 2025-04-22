import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { DataloaderService } from './dataloader.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  exports: [DataloaderService],
  providers: [DataloaderService],
})
export class DataloaderModule {}
