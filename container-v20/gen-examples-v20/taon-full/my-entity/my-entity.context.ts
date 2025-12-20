//#region imports
import { Taon, TaonBaseContext } from 'taon';

import { MyEntity } from './my-entity';
import { MyEntityController } from './my-entity.controller';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

export const MyEntityContext = Taon.createContext(() => ({
  contextName: 'MyEntityContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { MyEntity },
  controllers: { MyEntityController },
  repositories: { MyEntityRepository }
}))
