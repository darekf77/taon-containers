//#region imports
// @generated-imports-here
import { TaonBaseContext, Taon } from 'taon/src';
//#endregion

export const MyEntityActiveContext = Taon.createContext(() => ({
  ...HOST_CONFIG['MyEntityActiveContext'],
  contextName: 'MyEntityActiveContext',
  database: true,
  migrations: { ...MIGRATIONS_CLASSES_FOR_MyEntityActiveContext },
  contexts: { TaonBaseContext },
  entities: {},
  controllers: {},
  repositories: {},
  middlewares: {},
  providers: {},
}));
