import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

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
@Directive('@key(fields: "id")')
export class Product {
  @Field(() => ID, { name: 'id' })
  _id: string;
}
