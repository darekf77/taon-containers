//#region imports
import * as os from 'os'; // @backend

import { AsyncPipe, JsonPipe, NgFor } from '@angular/common'; // @browser
import {
  inject,
  Injectable,
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  mergeApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core'; // @browser
import { Component } from '@angular/core'; // @browser
import { VERSION } from '@angular/core'; // @browser
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { RenderMode, ServerRoute } from '@angular/ssr';
import Aura from '@primeng/themes/aura'; // @browser
import { providePrimeNG } from 'primeng/config'; // @browser
import { toSignal } from '@angular/core/rxjs-interop'; // @browser
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card'; // @browser
import { MatIconModule } from '@angular/material/icon'; // @browser
import { MatDividerModule } from '@angular/material/divider'; // @browser
import { MatButtonModule } from '@angular/material/button'; // @browser
import {
  Taon,
  TaonBaseContext,
  TAON_CONTEXT,
  EndpointContext,
  TaonBaseAngularService,
  TaonEntity,
  StringColumn,
  TaonBaseAbstractEntity,
  TaonBaseCrudController,
  TaonController,
  GET,
  TaonMigration,
  TaonBaseMigration,
} from 'taon/src';
import { Utils, UtilsOs } from 'tnp-core/src';

import { HOST_CONFIG } from './app.hosts';

//#endregion

console.log('hello world');
console.log('Your backend host ' + HOST_CONFIG['MainContext'].host);
console.log('Your frontend host ' + HOST_CONFIG['MainContext'].frontendHost);

//#region isomorphic-lib-v21 component

//#region @browser
@Component({
  selector: 'app-root',

  imports: [
    // RouterOutlet,
    AsyncPipe,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    NgFor,
    JsonPipe,
  ],
  template: `hello from isomorphic-lib-v21<br />
    Angular version: {{ angularVersion }}<br />
    <br />
    users from backend
    <mat-card appearance="outlined">
      <mat-card-content
        >Simple card
        <ul>
          @for (user of users(); track user.id) {
            <li>{{ user | json }}</li>
          }
        </ul>
      </mat-card-content>
    </mat-card>
    hello world from backend: <strong>{{ hello$ | async }}</strong>
    <br />
    <button mat-flat-button>
      <mat-icon>delete</mat-icon>
    </button>
    <button (click)="addUser()">Add new example user with random name</button>`,
  styles: [
    `
      body {
        margin: 0px !important;
      }
    `,
  ],
})
export class IsomorphicLibV21App {
  angularVersion =
    VERSION.full +
    ` mode: ${UtilsOs.isRunningInWebSQL() ? ' (websql)' : '(normal)'}`;

  userApiService = inject(UserApiService);

  private refresh = new BehaviorSubject<void>(undefined);

  readonly users = toSignal(
    this.refresh.pipe(
      switchMap(() =>
        this.userApiService.userController
          .getAll()
          .request()
          .observable.pipe(map(r => r.body.json)),
      ),
    ),
    { initialValue: [] },
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
export class UserApiService extends TaonBaseAngularService {
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

//#region  isomorphic-lib-v21 routes
//#region @browser
export const IsomorphicLibV21ServerRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
export const IsomorphicLibV21ClientRoutes: Routes = [];
//#endregion
//#endregion

//#region  isomorphic-lib-v21 app configs
//#region @browser
export const IsomorphicLibV21AppConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
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
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => IsomorphicLibV21StartFunction,
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(IsomorphicLibV21ClientRoutes),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

export const IsomorphicLibV21ServerConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(IsomorphicLibV21ServerRoutes))],
};

export const IsomorphicLibV21Config = mergeApplicationConfig(
  IsomorphicLibV21AppConfig,
  IsomorphicLibV21ServerConfig,
);
//#endregion
//#endregion

//#region  isomorphic-lib-v21 entity
@TaonEntity({ className: 'User' })
class User extends TaonBaseAbstractEntity {
  //#region @websql
  @StringColumn()
  //#endregion
  name?: string;

  getHello(): string {
    return `hello ${this.name}`;
  }
}
//#endregion

//#region  isomorphic-lib-v21 controller
@TaonController({ className: 'UserController' })
class UserController extends TaonBaseCrudController<User> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  entityClassResolveFn = () => User;

  @GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => 'hello world';
    //#endregion
  }

  @GET()
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
@TaonMigration({
  className: 'UserMigration',
})
class UserMigration extends TaonBaseMigration {
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

//#region  isomorphic-lib-v21 start function
const IsomorphicLibV21StartFunction = async (
  startParams?: Taon.StartParams,
): Promise<void> => {
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
};
//#endregion

export default IsomorphicLibV21StartFunction;
