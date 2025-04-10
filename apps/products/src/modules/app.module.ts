import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { Config } from 'src/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataloaderService } from './dataloader/dataloader.service';

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
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      inject: [DataloaderService],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: true,
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
    }),
    ProductsModule,
    CategoriesModule,
  ],
  providers: [ProductsModule, DataloaderModule],
})
export class AppModule {}
