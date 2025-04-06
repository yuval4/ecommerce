import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as Schema2 } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({})
@ObjectType()
@Directive('@key(fields: "_id")')
export class Product {
  @Field()
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
