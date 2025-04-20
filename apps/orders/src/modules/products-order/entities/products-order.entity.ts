import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/modules/orders/entities/product.entity';

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

  productId: string;

  orderId: string;

  @Prop({ required: true })
  @Field(() => Int)
  amount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  @Field(() => [Product], {
    nullable: true,
    defaultValue: [],
  })
  products?: Product[];
}

export const ProductsOrderSchema = SchemaFactory.createForClass(ProductsOrder);
