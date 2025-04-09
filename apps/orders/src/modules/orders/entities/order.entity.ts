import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductsOrder } from 'src/modules/products-order/entities/products-order.entity';

export type OrderDocument = HydratedDocument<Order>;

@ObjectType()
@Schema()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Order {
  @Field(() => ID, { name: 'id' })
  @Directive('@external')
  _id: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  orderDate: Date;

  // @Prop({ required: true })
  @Field(() => [ProductsOrder])
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  // owners: Owner[];
  productsOrder?: ProductsOrder[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
