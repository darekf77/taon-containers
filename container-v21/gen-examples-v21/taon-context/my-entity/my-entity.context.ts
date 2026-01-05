//#region imports
import { TaonBaseContext, Taon } from 'taon/src';

import { MyEntity } from './my-entity';
//#endregion

/**
 * Context types:
 * - abstract=true ONLY FOR SHARING/EXTENDING (does not create express server and database)
 * - abstract=false READY TO BE INITIALIZED (creates express server and database)
 */
export const MyEntityContext = Taon.createContext(() => ({
  // 1. Import HOST_CONFIG from app.hosts.ts when you use .initialize() function
  // 2. Uncomment line below to use .initialize() and make config active
  // ...HOST_CONFIG['MyEntityContext'],
  contextName: 'MyEntityContext', // not needed if using HOST_CONFIG object
  /**
   * set to false if you want to .initialize() this context independently
   * ( initialized context creates express server and database )
   */
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
