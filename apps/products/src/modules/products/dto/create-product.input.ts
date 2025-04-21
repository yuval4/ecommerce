import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductStatus } from '@repo/types';

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: true, defaultValue: new Date() })
  uploadedDate: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  description: string;

  @Field(() => Int, { nullable: false })
  price: number;

  @Field(() => String, { nullable: false })
  sellerName: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => ProductStatus, {
    nullable: true,
    defaultValue: ProductStatus.ACTIVE,
  })
  status: ProductStatus;
}
