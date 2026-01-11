//#region imports
import { Taon, TaonBaseContext } from 'taon';

import { MyEntity } from './my-entity.entity';
import { MyEntityController } from './my-entity.controller';
//#endregion

export const MyEntityContext = Taon.createContext(() => ({
  contextName: 'MyEntityContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { MyEntity },
  controllers: { MyEntityController }
}))
