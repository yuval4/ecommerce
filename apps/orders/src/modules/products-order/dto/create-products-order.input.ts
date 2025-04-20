import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductsOrderInput {
  @Field(() => Date, { nullable: true })
  productsOrderDate?: Date;

  @Field(() => String, { nullable: true })
  productId?: string;

  @Field(() => Int)
  amount: number;
}
