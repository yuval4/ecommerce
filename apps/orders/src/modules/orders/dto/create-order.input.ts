import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Date, { defaultValue: new Date() })
  orderDate: Date;
}
