import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from './entities/categories.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
