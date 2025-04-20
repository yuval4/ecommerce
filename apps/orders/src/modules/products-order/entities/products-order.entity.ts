import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/modules/orders/entities/product.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

// TODO clean up

export type ProductsOrderDocument = HydratedDocument<ProductsOrder>;

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
  productId: Product['_id'];

  @Prop({ required: true })
  @Field(() => Int)
  amount: number;
}

export const ProductsOrderSchema = SchemaFactory.createForClass(ProductsOrder);
