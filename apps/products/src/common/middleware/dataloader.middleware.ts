import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IDataloaders } from 'src/modules/dataloader/dataloader.interface';
import { DataloaderService } from 'src/modules/dataloader/dataloader.service';

@Injectable()
export class DataloaderMiddleware implements NestMiddleware {
  constructor(private readonly dataloaderService: DataloaderService) {}

  use(
    req: Request & { loaders?: IDataloaders },
    _res: Response,
    next: NextFunction,
  ) {
    req.loaders = this.dataloaderService.getLoaders();
    next();
  }
}
