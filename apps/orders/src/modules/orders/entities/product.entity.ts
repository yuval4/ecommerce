import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { SchemaFactory } from '@nestjs/mongoose';

// TODO extends and external
// TODO move to common

// TODO move to common
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'The status of the product',
});

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Product {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
