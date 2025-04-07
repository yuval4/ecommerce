import { Field, InputType } from '@nestjs/graphql';
import { ProductStatus } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: true, defaultValue: new Date() })
  uploadDate: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  price: string;

  @Field(() => String, { nullable: false })
  sellerName: string;

  @Field(() => String, { nullable: true })
  imageUrl: string;

  // @Field(() => String, { nullable: true })
  // categories: string;

  @Field(() => ProductStatus, { nullable: true })
  status: ProductStatus;
}
