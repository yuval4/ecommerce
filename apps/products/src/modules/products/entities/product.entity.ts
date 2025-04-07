import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from 'src/modules/categories/entities/categories.entity';

export type ProductDocument = HydratedDocument<Product>;

// TODO move to common
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'The status of the product',
});

@Schema({})
@ObjectType()
@Directive('@key(fields: "id")')
export class Product {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  uploadedDate: string;

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

  @Field(() => ProductStatus)
  @Prop({ type: String, enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  // TODO edit
  @Field(() => Category, { nullable: true })
  @Prop({ required: false })
  categories: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
