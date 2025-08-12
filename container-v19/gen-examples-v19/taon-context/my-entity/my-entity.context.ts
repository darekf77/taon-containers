//#region imports
import { BaseContext, Taon } from 'taon/src';

import { MyEntity } from './my-entity';
//#endregion

export const MyEntityContext = Taon.createContext(()=> ({
  // ...HOST_CONFIG[][], // import from app.hosts.ts if config initialization is needed
  contextName: 'MyEntityContext', // not needed if using HOST_CONFIG object
  contexts: { BaseContext },
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
  migrations: {

  },
}));


