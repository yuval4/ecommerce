import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Category } from '../entities/categories.entity';
import { CreateCategoryInput } from './create-category.input';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String)
  _id: Category['_id'];
}
