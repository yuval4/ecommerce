// import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

// @Module({
//   imports: [],
//   providers: [ProductsModule],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: true, // Automatically generates the schema
    }),
  ],
  providers: [ProductsModule],
})
export class AppModule {}
