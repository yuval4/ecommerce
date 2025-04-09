import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProductsOrderInput } from './create-products-order.input';

@InputType()
export class UpdateProductsOrderInput extends PartialType(
  CreateProductsOrderInput,
) {
  @Field(() => String)
  _id: string;
}
