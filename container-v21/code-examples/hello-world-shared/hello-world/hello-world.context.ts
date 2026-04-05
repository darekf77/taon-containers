//#region imports
import { Taon, TaonBaseContext } from 'taon/src';
import { HelloWorldController } from './hello-world.controller';
//#endregion

export const HelloWorldContext = Taon.createContext(() => ({
  contextName: 'HelloWorldContext',
  abstract: true,
  contexts: { TaonBaseContext },
  controllers: { HelloWorldController },
}));
