import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [],
  providers: [ProductsModule],
})
export class AppModule {}
