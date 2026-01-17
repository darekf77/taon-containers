//#region imports
import { TaonBaseContext, createContext } from 'taon/src';

//#endregion

export const MyEntityAbstractContext = createContext(() => ({
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
