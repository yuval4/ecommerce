import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
// import { add } from '@repo/types';

@Injectable()
export class ProductsService {
  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  findAll() {
    return [{ exampleField: 11 }, { exampleField: 999 }];
    // return [{ exampleField: add(1, 9) }, { exampleField: 999 }];
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
