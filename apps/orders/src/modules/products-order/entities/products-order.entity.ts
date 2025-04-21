import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/orders/entities/product.entity';

// TODO clean up
// TODO extends and external

@ObjectType()
@Schema()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class ProductsOrder {
  @Field(() => ID, { name: 'id' })
  @Directive('@external')
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  orderId: Order['_id'];

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  @Field(() => ID)
  productId: Product['id'];

  @Prop({ required: true })
  @Field(() => Int)
  amount: number;
}

export const ProductsOrderSchema = SchemaFactory.createForClass(ProductsOrder);
