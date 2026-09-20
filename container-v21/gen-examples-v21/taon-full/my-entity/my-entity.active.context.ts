//#region imports
// @generated-imports-here
import { TaonBaseContext, createContext } from 'taon/src';
//#endregion

export const MyEntityActiveContext = createContext(() => ({
  // ! TODO UNCOMMENT AND IMPORT
  // ...HOST_CONFIG['MyEntityActiveContext'],
  contextName: 'MyEntityActiveContext',
  database: true,
  // ! TODO UNCOMMENT AND IMPORT
  // migrations: { ...MIGRATIONS_CLASSES_FOR_MyEntityActiveContext },
  contexts: { TaonBaseContext },
  entities: {},
  controllers: {},
  repositories: {},
  middlewares: {},
  providers: {},
}));
