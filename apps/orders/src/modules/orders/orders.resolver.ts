import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { OrdersService } from './orders.service';
import { ProductsOrder } from '../products-order/entities/products-order.entity';

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
  findOne(
    @Args('id', { type: () => String }) id: Order['_id'],
  ): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.ordersService.update(updateOrderInput._id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(
    @Args('id', { type: () => String }) id: Order['_id'],
  ): Promise<Order> {
    return this.ordersService.remove(id);
  }

  @ResolveField(() => ProductsOrder)
  productOrders(@Parent() order: Order) {
    return { __typename: 'ProductsOrder', id: order._id };
  }
}
