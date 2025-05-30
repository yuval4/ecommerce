import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products-order/entities/product.entity';

@ObjectType()
@Schema()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class ProductsOrder {
  @Field(() => ID, { name: 'id' })
  @Directive('@external')
  _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  orderId: Order['_id'];

  @Prop({ type: Types.ObjectId, required: true })
  productId: Product['id'];

  @Prop({ required: true })
  @Field(() => Int)
  amount: number;
}

export const ProductsOrderSchema = SchemaFactory.createForClass(ProductsOrder);
