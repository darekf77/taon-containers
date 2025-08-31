//#region imports
import { Taon, BaseContext } from 'taon/src';

import { TaonUser } from './taon-user';
import { TaonUserController } from './taon-user.controller';
//#endregion

export const TaonUserContext = Taon.createContext(() => ({
  /**
   * import HOST_CONFIG from app.hosts.ts if config initialization is needed
   * HOST_CONFIG contains contextName and other crusial information for context
   * seemless integration with Taon CLI
   */
  // ...HOST_CONFIG['TaonUserContext'],
  contextName: 'TaonUserContext',  // not needed if using HOST_CONFIG object
  /**
   * set to false if you not going to initialize() this context independently
   * ( initialized context creates express server and database )
   */
  abstract: false,
  /**
   * database:true - if this context is going to use database
   */
  database: false,
  contexts: { BaseContext },
  entities: { TaonUser },
  controllers: { TaonUserController }
}))