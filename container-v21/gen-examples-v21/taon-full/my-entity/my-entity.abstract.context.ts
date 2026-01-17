//#region imports
import { createContext, TaonBaseContext } from 'taon';

import { MyEntity } from './my-entity.entity';
import { MyEntityController } from './my-entity.controller';
import { MyEntityRepository } from './my-entity.repository';
import { MyEntityProvider } from './my-entity.provider';
import { MyEntityMiddleware } from './my-entity.middleware';
import { MyEntitySubscriber } from './my-entity.subscriber';
//#endregion

export const MyEntityContext = createContext(() => ({
  contextName: 'MyEntityContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { MyEntity },
  controllers: { MyEntityController },
  repositories: { MyEntityRepository },
  providers: { MyEntityProvider },
  middlewares: { MyEntityMiddleware },
  subscribers: { MyEntitySubscriber },
}));
