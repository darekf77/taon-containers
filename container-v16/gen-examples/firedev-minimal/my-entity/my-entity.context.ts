//#region imports
import { Firedev, TaonBaseContext } from 'firedev';
import { MyEntity } from './my-entity';
import { MyEntityController } from './my-entity.controller';
//#endregion

export const MyEntityContext = Firedev.createContext(() => ({
  contextName: 'MyEntityContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { MyEntity },
  controllers: { MyEntityController }
}))
