//#region imports
import { createContext, TaonBaseContext } from 'taon';

import { MyEntityEntity } from './my-entity.entity';
import { MyEntityController } from './my-entity.controller';
import { MyEntityRepository } from './my-entity.repository';
// import { MyEntityKvRepository } from './my-entity.kv.repository';
import { MyEntityProvider } from './my-entity.provider';
// import { MyEntityMiddleware } from './my-entity.middleware';
// import { MyEntitySubscriber } from './my-entity.subscriber';
//#endregion

export const MyEntityAbstractContext = createContext(() => ({
  contextName: 'MyEntityAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { MyEntityEntity },
  controllers: { MyEntityController },
  repositories: {
    // MyEntityKvRepository
    MyEntityRepository,
  },
  providers: { MyEntityProvider },
  // middlewares: { MyEntityMiddleware },
  // subscribers: { MyEntitySubscriber },
}));
