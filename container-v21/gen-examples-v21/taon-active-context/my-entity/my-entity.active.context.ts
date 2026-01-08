//#region imports
import { TaonBaseContext, Taon } from 'taon/src';
//#endregion

export const MyEntityContext = Taon.createContext(() => ({
  ...HOST_CONFIG['MyEntityContext'],
  contextName: 'MyEntityContext',
  database: true,
  migrations: { ...MIGRATIONS_CLASSES_FOR_MyEntityContext },
  contexts: { TaonBaseContext },
  entities: {},
  controllers: {},
  repositories: {},
  middlewares: {},
  providers: {},
}));
