import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [CategoriesModule],
  exports: [DataloaderService],
  providers: [DataloaderService],
})
export class DataloaderModule {}
