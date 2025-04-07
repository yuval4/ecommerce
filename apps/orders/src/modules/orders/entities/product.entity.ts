import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

// TODO move to common
export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'The status of the product',
});

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Product {
  @Field(() => ID)
  _id: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
