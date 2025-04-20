import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from 'src/modules/orders/entities/product.entity';
import { CreateProductsOrderInput } from './dto/create-products-order.input';
import { UpdateProductsOrderInput } from './dto/update-products-order.input';
import { ProductsOrder } from './entities/products-order.entity';
import { ProductsOrdersService } from './products-orders.service';

@Resolver(() => ProductsOrder)
export class ProductsOrdersResolver {
  constructor(private readonly productsOrdersService: ProductsOrdersService) {}

  @Mutation(() => ProductsOrder)
  createProductsOrder(
    @Args('createProductsOrderInput')
    createProductsOrderInput: CreateProductsOrderInput,
  ): Promise<ProductsOrder> {
    return this.productsOrdersService.create(createProductsOrderInput);
  }

  @Query(() => [ProductsOrder], { name: 'productsOrders' })
  findAll(): Promise<ProductsOrder[]> {
    return this.productsOrdersService.findAll();
  }

  @Query(() => ProductsOrder, { name: 'productsOrder' })
  findOne(
    @Args('id', { type: () => String }) id: ProductsOrder['_id'],
  ): Promise<ProductsOrder> {
    return this.productsOrdersService.findOne(id);
  }

  @Mutation(() => ProductsOrder)
  updateProductsProductsOrder(
    @Args('updateProductsOrderInput')
    updateProductsOrderInput: UpdateProductsOrderInput,
  ): Promise<ProductsOrder> {
    return this.productsOrdersService.update(
      updateProductsOrderInput._id,
      updateProductsOrderInput,
    );
  }

  @Mutation(() => ProductsOrder)
  removeProductsOrder(
    @Args('id', { type: () => String }) id: ProductsOrder['_id'],
  ): Promise<ProductsOrder> {
    return this.productsOrdersService.remove(id);
  }

  // @ResolveField(() => Product)
  // product(@Parent() productsOrder: ProductsOrder) {
  //   return { __typename: 'Product', id: productsOrder.productId };
  // }
}
