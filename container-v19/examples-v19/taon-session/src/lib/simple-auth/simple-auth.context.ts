//#region imports
import { BaseContext, Taon } from 'taon/src';

import { TaonSessionContext } from './taon-session';
import { TaonUserContext } from './taon-user';
//#endregion

export const SimpleAuthContext = Taon.createContext(() => ({
  /**
   * import HOST_CONFIG from app.hosts.ts if config initialization is needed
   * HOST_CONFIG contains contextName and other crusial information for context
   * seemless integration with Taon CLI
   */
  // ...HOST_CONFIG['SimpleAuthContext'],
  contextName: 'SimpleAuthContext', // not needed if using HOST_CONFIG object
  /**
   * set to false if you not going to initialize() this context independently
   * ( initialized context creates express server and database )
   */
  abstract: true,
  /**
   * database:true - if this context is going to use database
   */
  database: false,
  contexts: { BaseContext, TaonUserContext, TaonSessionContext },
  entities: {},
  controllers: {},
  repositories: {},
  middlewares: {},
  providers: {},
}));
