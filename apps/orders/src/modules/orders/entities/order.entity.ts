import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Order {
  @Field(() => ID)
  @Directive('@external')
  id: number;

  @Field(() => [Product])
  products?: Product[];
}
