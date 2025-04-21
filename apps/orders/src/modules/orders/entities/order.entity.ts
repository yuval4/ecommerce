import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductsOrder } from 'src/modules/products-order/entities/products-order.entity';

@ObjectType()
@Schema()
@Directive('@key(fields: "id")')
export class Order {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  orderDate: Date;

  // TODO
  // @Prop({ required: true })
  @Field(() => [ProductsOrder])
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  // owners: Owner[];
  productsOrder?: ProductsOrder[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
