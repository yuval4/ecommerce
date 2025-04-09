import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductsOrderInput {
  @Field(() => Date, { nullable: true })
  productsOrderDate?: Date;

  @Field(() => Int)
  amount: number;
}
