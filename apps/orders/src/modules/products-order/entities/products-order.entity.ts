import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/modules/orders/entities/product.entity';

// TODO clean up

export type ProductsOrderDocument = HydratedDocument<ProductsOrder>;

@ObjectType()
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

  @Prop({ required: true })
  @Field(() => [Product])
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  // owners: Owner[];
  products?: Product[];
}

export const ProductsOrderSchema = SchemaFactory.createForClass(ProductsOrder);
