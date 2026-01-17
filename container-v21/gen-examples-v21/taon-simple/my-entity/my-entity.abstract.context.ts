//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { MyEntity } from './my-entity.entity';
import { MyEntityController } from './my-entity.controller';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

export const MyEntityContext = createContext(() => ({
  contextName: 'MyEntityContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { MyEntity },
  controllers: { MyEntityController },
  repositories: { MyEntityRepository },
}));
