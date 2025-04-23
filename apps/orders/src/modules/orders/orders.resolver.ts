import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductsOrder } from '../products-order/entities/products-order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { IDataloaders } from '../dataloader/dataloader.interface';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: Order['id']): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(
    @Args('id', { type: () => String }) id: Order['id'],
  ): Promise<Order> {
    return this.ordersService.remove(id);
  }

  @ResolveField(() => [ProductsOrder])
  productOrders(
    @Parent() order: Order,
    @Context() { loaders }: { loaders: IDataloaders },
  ): Promise<ProductsOrder[]> {
    return loaders.productsOrdersLoader.load(order.id);
  }
}
