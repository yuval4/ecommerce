import { Field, InputType } from '@nestjs/graphql';
import { CreateProductsOrderInput } from 'src/modules/products-order/dto/create-products-order.input';

@InputType()
export class CreateOrderInput {
  @Field(() => Date, { nullable: true, defaultValue: new Date() })
  orderDate?: Date;

  @Field(() => [CreateProductsOrderInput], { nullable: true, defaultValue: [] })
  productOrders?: CreateProductsOrderInput[];
}
