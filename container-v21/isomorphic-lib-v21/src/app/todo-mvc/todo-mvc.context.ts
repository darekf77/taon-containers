//#region imports
import { TaonBaseContext, Taon } from 'taon/src';

import { HOST_CONFIG } from '../../app.hosts';
import { TaskContext } from 'isomorphic-lib-v21/src';
import { MIGRATIONS_CLASSES_FOR_TodoMvcContext } from '../../migrations';
//#endregion

/**
 * Context types:
 * - abstract=true ONLY FOR SHARING/EXTENDING (does not create express server and database)
 * - abstract=false READY TO BE INITIALIZED (creates express server and database)
 */
export const TodoMvcContext = Taon.createContext(() => ({
  // 1. Import HOST_CONFIG from app.hosts.ts when you use .initialize() function
  // 2. Uncomment line below to use .initialize() and make config active
  ...HOST_CONFIG['TodoMvcContext'],
  migrations: MIGRATIONS_CLASSES_FOR_TodoMvcContext,
  contextName: 'TodoMvcContext', // not needed if using HOST_CONFIG object
  database: true,
  contexts: { TaonBaseContext, TaskContext },
  logs: {
    framework: true,
    // db: true,
    migrations: true,
  },
}));
