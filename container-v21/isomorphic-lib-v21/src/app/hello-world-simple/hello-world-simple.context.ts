//#region imports
import { HelloWorldContext } from 'isomorphic-lib-v21/src';
import { TaonBaseContext, Taon } from 'taon/src';

import { HOST_CONFIG } from '../../app.hosts';
//#endregion

/**
 * Context types:
 * - abstract=true ONLY FOR SHARING/EXTENDING (does not create express server and database)
 * - abstract=false READY TO BE INITIALIZED (creates express server and database)
 */
export const HelloWorldSimpleContext = Taon.createContext(() => ({
  ...HOST_CONFIG['HelloWorldSimpleContext'],
  contextName: 'HelloWorldSimpleContext',
  database: true,
  contexts: { TaonBaseContext, HelloWorldContext },
}));
