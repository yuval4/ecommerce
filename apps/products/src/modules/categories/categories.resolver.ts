import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { Category } from './entities/categories.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoriesService } from './categories.service';

// TODO soft delete?

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'getCategories' })
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(
    @Args('id', { type: () => String }) id: Category['_id'],
  ): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.update(
      updateCategoryInput._id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  removeCategory(
    @Args('id', { type: () => String }) id: Category['_id'],
  ): Promise<Category> {
    return this.categoriesService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: Category['_id'];
  }): Promise<Category> {
    return this.categoriesService.findOne(reference.id);
  }
}
