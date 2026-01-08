//#region imports
import { TaonBaseContext, Taon } from 'taon/src';

import { MyEntity } from './my-entity';
//#endregion

export const MyEntityContext = Taon.createContext(() => ({
  contextName: 'MyEntityContext',
  abstract: true,
  database: false,
  contexts: { TaonBaseContext },
  entities: {
    MyEntity,
  },
  controllers: {},
  repositories: {},
  middlewares: {},
  providers: {},
}));
