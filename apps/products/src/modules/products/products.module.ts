import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ProductDataLoader } from './products.dataloader';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoriesModule,
  ],
  providers: [ProductsResolver, ProductsService, ProductDataLoader],
})
export class ProductsModule {}
