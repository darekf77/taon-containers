import { TaonBaseContext, Firedev, createContext } from 'firedev/src';
import { Session } from './session/sesison';
import { User } from './user/user';
import { UserController } from './user/user.controller';
import { SessionController } from './session/session.controller';
import { GroupContext } from './groups/group.context';

export const SharedContext = createContext(() => ({
  contextName: 'SharedContext',
  host: 'http://abstract.host.com',
  contexts: { TaonBaseContext, GroupContext },
  entities: { User, Session },
  controllers: { UserController, SessionController },
}));

