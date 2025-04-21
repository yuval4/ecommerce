import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Category } from '../categories/entities/categories.entity';
import { IDataloaders } from '../dataloader/dataloader.interface';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

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

  @Query(() => Product, { name: 'getProductById' })
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

  @ResolveField(() => [Category])
  categories(
    @Parent() product: Product,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return loaders.categoriesLoader.load({
      _id: product._id,
      categories: product.categories,
    });
  }
}
