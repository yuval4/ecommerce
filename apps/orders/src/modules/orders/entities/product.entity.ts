import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Product {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
