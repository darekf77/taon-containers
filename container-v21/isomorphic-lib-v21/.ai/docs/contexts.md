# Contexts

- There are 2 types of contexts<br>
  -> **Abstract** (abstract:true) - use in shared lib code<br>
  -> **Active** (abstract:false) - use in app code with HOST_CONFIG and automatic MIGRATIONS_FOR_your context object<br>
- aggregates all (backend + frontend bridge) building blocks
- starts TCP/Sockets/IPC server <br>
- multiple contexts === multiple servers in 1 NodeJs app in development
- **deployable config** => all detected configs from /src/app.* or /src/app/**/*.*
- each **deployable** config is automatically a seprated NodeJS process when deployed
- initialization of database (only 1 db per context allowed)

```ts
import { Taon, TaonBaseContext } from 'taon/src';

const MainAbstractContext = Taon.createContext(() => ({
  abstract: true,
  disabledRealtime: true, // childrent do not inherit this
  contextName: 'MainAbstractContext',
  contexts: { TaonBaseContext }, 
  // TaonBaseContext almost always needed
  controllers: {
    UserController,
  },
  entities: {
    User,
  },
  // ...also migrations, repositories, providers, subscribers etc. here
  database: true,
  logs: true,
}));

// automatically detected by Taon CLI
// HOST_CONFIG => generated in app.hosts.ts
const DeployableActiveContext = Taon.createContext(() => ({
  ...HOST_CONFIG['DeployableActiveContext'], 
  // generated HOST_CONFIG includes contextName, host,
  // frontendHost and more...

  contexts: { MainAbstractContext },
   // everything inherited from MainAbstractContext
}));

@TaonEntity({className:'User'})
export ExtendedUser extends User {
  @StringColumn()
  middleName:string;
}

const BiggerBackendActiveContext = Taon.createContext(() => ({
  ...HOST_CONFIG['BiggerBackendActiveContext'], 
  disabledRealtime: trie,
  contexts: { 
    TaonBaseContext,
    MainAbstractContext, 
    // classes/frameowrk building blocks
    // inherited from MainAbstractContext
  },
  entities: {
    User: ExtendedUser 
    // decorating User entity
  }
  // same for:
  // migrations, repositories, providers etc.
  database: true,
  logs: true,
}));

async function start() {

  await DeployableActiveContext.initialize(); 
  // you should initialize all your deployable configs in start function

  await BiggerBackendActiveContext.initialize(); 
  // you have to initialize you config before using


 //... 
}
```
