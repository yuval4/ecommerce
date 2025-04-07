import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

@Schema({})
@ObjectType()
@Directive('@key(fields: "_id")')
export class Product {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  uploadDate: string;

  @Field()
  @Prop({ required: false })
  description: string;

  @Field()
  @Prop({ required: false })
  price: string;

  @Field()
  @Prop({ required: true })
  sellerName: string;

  @Field()
  @Prop({ required: false })
  imageUrl: string;

  // @Field()
  // @Prop({ required: false })
  // categories: string;

  @Field(() => ProductStatus)
  @Prop({ type: String, enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
