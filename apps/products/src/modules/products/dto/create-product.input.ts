import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductStatus } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: true, defaultValue: new Date() })
  uploadedDate: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field(() => String, { nullable: false })
  sellerName: string;

  @Field(() => String, {
    nullable: true,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvAnXgqD8WH2Z4NNEkQIwmuujboUOtoHeFKg&s',
  })
  imageUrl: string;

  @Field(() => ProductStatus, { nullable: true })
  status: ProductStatus;
}
