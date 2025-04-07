import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Category } from '../categories/entities/categories.entity';

// TODO soft delete?

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'getActiveProducts' })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('id', { type: () => String }) id: Product['_id'],
  ): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update(
      updateProductInput._id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(
    @Args('id', { type: () => String }) id: Product['_id'],
  ): Promise<Product> {
    return this.productsService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: Product['_id'];
  }): Promise<Product> {
    return this.productsService.findOne(reference.id);
  }

  @ResolveField()
  async categories(@Parent() product): Promise<Category> {
    const id = 'author';
    return { name: 'dsf', _id: id } as Category;
  }
}
