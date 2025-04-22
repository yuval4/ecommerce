import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DataloaderMiddleware } from 'src/common/middleware/dataloader.middleware';
import configuration, { Config } from 'src/config/configuration';
import { CategoriesModule } from './categories/categories.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<Config['connection']>('connection').uri,
        dbName: configService.get<Config['connection']>('connection').dbName,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
      cors: true,
      context: ({ req }) => ({
        loaders: req.loaders,
      }),
    }),
    ProductsModule,
    CategoriesModule,
    DataloaderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DataloaderMiddleware).forRoutes('*');
  }
}
