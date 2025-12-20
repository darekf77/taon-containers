//#region imports
import * as os from 'os'; // @backend

import { CommonModule } from '@angular/common'; // @browser
import { NgModule, inject, Injectable } from '@angular/core'; // @browser
import { Component, OnInit } from '@angular/core'; // @browser
import { VERSION } from '@angular/core'; // @browser
import Aura from '@primeng/themes/aura'; // @browser
import { MaterialCssVarsModule } from 'angular-material-css-vars'; // @browser
import { providePrimeNG } from 'primeng/config'; // @browser
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { Taon, TaonBaseContext, TAON_CONTEXT, EndpointContext } from 'taon/src';
import { Utils, UtilsOs } from 'tnp-core/src';

import { HOST_CONFIG } from './app.hosts';
//#endregion

console.log('hello world');
console.log('Your backend host ' + HOST_CONFIG['MainContext'].host);
console.log('Your frontend host ' + HOST_CONFIG['MainContext'].frontendHost);

//#region isomorphic-lib-v21 component

//#region @browser
@Component({
  selector: 'app-isomorphic-lib-v21',
  standalone: false,
  template: `hello from isomorphic-lib-v21<br />
    Angular version: {{ angularVersion }}<br />
    <br />
    users from backend
    <ul>
      <li *ngFor="let user of users$ | async">{{ user | json }}</li>
    </ul>
    hello world from backend: <strong>{{ hello$ | async }}</strong>
    <br />
    <button (click)="addUser()">Add new example user with random name</button>`,
  styles: [
    `
      body {
        margin: 0px !important;
      }
    `,
  ],
})
export class IsomorphicLibV21Component {
  angularVersion =
    VERSION.full +
    ` mode: ${UtilsOs.isRunningInWebSQL() ? ' (websql)' : '(normal)'}`;

  userApiService = inject(UserApiService);

  private refresh = new BehaviorSubject<void>(undefined);

  readonly users$: Observable<User[]> = this.refresh.pipe(
    switchMap(() =>
      this.userApiService.userController
        .getAll()
        .request()
        .observable.pipe(map(r => r.body.json)),
    ),
  );

  readonly hello$ = this.userApiService.userController
    .helloWorld()
    .request()
    .observable.pipe(map(r => r.body.text));

  async addUser(): Promise<void> {
    const newUser = new User();
    newUser.name = `user-${Math.floor(Math.random() * 1000)}`;
    await this.userApiService.userController.save(newUser).request();
    this.refresh.next();
  }
}
//#endregion

//#endregion

//#region  isomorphic-lib-v21 api service

//#region @browser
@Injectable({
  providedIn: 'root',
})
export class UserApiService extends Taon.Base.AngularService {
  userController = this.injectController(UserController);

  getAll(): Observable<User[]> {
    return this.userController
      .getAll()
      .request()
      .observable.pipe(map(r => r.body.json));
  }
}
//#endregion

//#endregion

//#region  isomorphic-lib-v21 module

//#region @browser
@NgModule({
  providers: [
    {
      provide: TAON_CONTEXT,
      useFactory: () => MainContext,
    },
    providePrimeNG({
      // inited ng prime - remove if not needed
      theme: {
        preset: Aura,
      },
    }),
  ],
  exports: [IsomorphicLibV21Component],
  imports: [
    CommonModule,
    MaterialCssVarsModule.forRoot({
      // inited angular material - remove if not needed
      primary: '#4758b8',
      accent: '#fedfdd',
    }),
  ],
  declarations: [IsomorphicLibV21Component],
})
export class IsomorphicLibV21Module {}
//#endregion

//#endregion

//#region  isomorphic-lib-v21 entity
@Taon.Entity({ className: 'User' })
class User extends Taon.Base.AbstractEntity {
  //#region @websql
  @Taon.Orm.Column.String()
  //#endregion
  name?: string;

  getHello(): string {
    return `hello ${this.name}`;
  }
}
//#endregion

//#region  isomorphic-lib-v21 controller
@Taon.Controller({ className: 'UserController' })
class UserController extends Taon.Base.CrudController<User> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  entityClassResolveFn = () => User;

  @Taon.Http.GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => 'hello world';
    //#endregion
  }

  @Taon.Http.GET()
  getOsPlatform(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      //#region @backend
      return os.platform(); // for normal nodejs backend return real value
      //#endregion

      return 'no-platform-inside-browser-and-websql-mode';
    };
    //#endregion
  }
}
//#endregion

//#region  isomorphic-lib-v21 migration

//#region @websql
@Taon.Migration({
  className: 'UserMigration',
})
class UserMigration extends Taon.Base.Migration {
  userController = this.injectRepo(User);

  async up(): Promise<any> {
    const superAdmin = new User();
    superAdmin.name = 'super-admin';
    await this.userController.save(superAdmin);
  }
}
//#endregion

//#endregion

//#region  isomorphic-lib-v21 context
var MainContext = Taon.createContext(() => ({
  ...HOST_CONFIG['MainContext'],
  contexts: { TaonBaseContext },

  //#region @websql
  /**
   * This is dummy migration - you DO NOT NEED need this migrations object
   * if you are using HOST_CONFIG['MainContext'] that contains 'migrations' object.
   * DELETE THIS 'migrations' object if you use taon CLI that generates
   * migrations automatically inside /src/migrations folder.
   */
  migrations: {
    UserMigration,
  },
  //#endregion

  controllers: {
    UserController,
  },
  entities: {
    User,
  },
  database: true,
  // disabledRealtime: true,
}));
//#endregion

async function start(startParams?: Taon.StartParams): Promise<void> {
  await MainContext.initialize();

  //#region @backend
  if (
    startParams?.onlyMigrationRun ||
    startParams?.onlyMigrationRevertToTimestamp
  ) {
    process.exit(0);
  }
  //#endregion

  //#region @backend
  console.log(`Hello in NodeJs backend! os=${os.platform()}`);
  //#endregion

  if (UtilsOs.isBrowser) {
    let users = (
      await MainContext.getClassInstance(UserController).getAll().request()
    ).body?.json;

    if (UtilsOs.isElectron) {
      // TODO QUICK_FIX (ng2-rest refactor for ipc needed)
      users = users.map(u => new User().clone(u));
    }

    for (const user of users || []) {
      console.log(`user: ${user.name} - ${user.getHello()}`);
    }
  }
}

export default start;