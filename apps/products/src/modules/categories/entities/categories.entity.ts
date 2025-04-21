import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({})
@ObjectType()
@Directive('@key(fields: "categoryId")')
export class Category {
  @Field(() => ID, { name: 'categoryId' })
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
