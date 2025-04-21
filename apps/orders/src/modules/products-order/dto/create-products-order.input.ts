import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductsOrderInput {
  @Field(() => String)
  orderId: string;

  @Field(() => String)
  productId: string;

  @Field(() => Int)
  amount: number;
}
