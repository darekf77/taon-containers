//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { MyEntityEntity } from './my-entity.entity';
import { MyEntityController } from './my-entity.controller';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

export const MyEntityContextAbstractContext = createContext(() => ({
  contextName: 'MyEntityContextAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { MyEntityEntity },
  controllers: { MyEntityController },
  repositories: { MyEntityRepository },
}));
