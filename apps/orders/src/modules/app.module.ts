import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import configuration, { Config } from 'src/config/configuration';
import { OrdersModule } from './orders/orders.module';
import { ProductOrdersModule } from './products-order/produts-orders.module';
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
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [DataloaderModule],
      inject: [DataloaderService],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: { federation: 2 },
          cors: true,
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
    }),
    OrdersModule,
    ProductOrdersModule,
  ],
  providers: [OrdersModule, ProductOrdersModule],
})
export class AppModule {}
