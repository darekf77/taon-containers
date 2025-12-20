//#region imports
import { TaonBaseContext, Taon } from 'taon/src';

import { MyEntity } from './my-entity';
//#endregion

export const MyEntityContext = Taon.createContext(()=> ({
  /**
   * import HOST_CONFIG from app.hosts.ts if config initialization is needed
   * HOST_CONFIG contains contextName and other crusial information for context
   * seemless integration with Taon CLI
   */
  // ...HOST_CONFIG['MyEntityContext'],
  contextName: 'MyEntityContext', // not needed if using HOST_CONFIG object
  /**
   * set to false if you not going to initialize() this context independently
   * ( initialized context creates express server and database )
   */
  abstract: false,
  /**
   * database:true - if this context is going to use database
   */
  database: false,
  contexts: { TaonBaseContext },
  entities:{
    MyEntity
  },
  controllers:{

  },
  repositories: {

  },
  middlewares: {

  },
  providers: {

  },
}));


