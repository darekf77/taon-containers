//#region imports
import { TaonBaseContext, Taon } from 'taon/src';

//#endregion

export const MyEntityAbstractContext = Taon.createContext(() => ({
  contextName: 'MyEntityAbstractContext',
  abstract: true,
  database: false,
  contexts: { TaonBaseContext },
  entities: { },
  controllers: {},
  repositories: {},
  middlewares: {},
  providers: {},
}));
