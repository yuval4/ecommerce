import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
@Directive('@key(fields: "id")')
export class Order {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
