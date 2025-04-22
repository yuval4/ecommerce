import {
  Directive,
  Field,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductStatus } from '@repo/types';
import mongoose from 'mongoose';
import { Category } from 'src/modules/categories/entities/categories.entity';

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'The status of the product',
});

@Schema()
@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable')
export class Product {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Date)
  @Prop({ required: true, type: Date })
  uploadedDate: Date;

  @Field()
  @Prop({ required: false })
  description: string;

  @Field(() => Int)
  @Prop({ required: true, type: 'Number' })
  price: number;

  @Field()
  @Prop({ required: true })
  sellerName: string;

  @Field()
  @Prop({
    required: false,
    // * default image should be in the client
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvAnXgqD8WH2Z4NNEkQIwmuujboUOtoHeFKg&s',
  })
  imageUrl: string;

  @Field(() => ProductStatus)
  @Prop({ type: String, enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Field(() => [Category])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
    default: [],
  })
  categories: Category['_id'][];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
