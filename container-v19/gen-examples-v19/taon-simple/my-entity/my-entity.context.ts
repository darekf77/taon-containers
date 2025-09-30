//#region imports
import { Taon, BaseContext } from 'taon';

import { MyEntity } from './my-entity';
import { MyEntityController } from './my-entity.controller';
//#endregion

export const MyEntityContext = Taon.createContext(() => ({
  /**
   * import HOST_CONFIG from app.hosts.ts if config initialization is needed
   * HOST_CONFIG contains contextName and other crusial information for context
   * seemless integration with Taon CLI
   */
  // ...HOST_CONFIG['MyEntityContext'],
  contextName: 'MyEntityContext',  // not needed if using HOST_CONFIG object
  /**
   * set to false if you not going to initialize() this context independently
   * ( initialized context creates express server and database )
   */
  abstract: false,
  /**
   * database:true - if this context is going to use database
   */
  database: false,
  // if you need a migration to work - uncomment
  // migrations: {
  //   ...MIGRATIONS_CLASSES_FOR_MyEntityContext,
  // },
  contexts: { BaseContext },
  entities: { MyEntity },
  controllers: { MyEntityController }
}))
