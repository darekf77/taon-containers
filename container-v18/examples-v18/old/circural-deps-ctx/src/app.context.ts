import { SharedContext } from 'circural-deps-ctx/src';
import { Taon, TaonBaseContext, createContext } from 'taon/src';
import { HOST_BACKEND_PORT } from './app.hosts';
import { GroupContext } from 'circural-deps-ctx/src';

const host = 'http://localhost:' + HOST_BACKEND_PORT;
const AppContext = Taon.createContext(() => ({
  contextName: 'AppContext',
  host,
  contexts: { SharedContext, TaonBaseContext, GroupContext },
  database: true,
  logFramework: true,
  serverLogs: true,
}));

// AppContext.contexts.SharedContext;
(AppContext.contexts.GroupContext as typeof GroupContext)

export { AppContext };
