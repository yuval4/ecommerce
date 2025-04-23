import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String)
  id: Product['id'];
}
