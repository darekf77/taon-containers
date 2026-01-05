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
import {
  provideRouter,
  Router,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  ActivatedRoute,
  Routes,
} from '@angular/router';
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
import { MatListModule } from '@angular/material/list'; // @browser
import { MatTabsModule } from '@angular/material/tabs'; // @browser
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
import { TodoMvcContext } from './app/todo-mvc/todo-mvc.context';
import { HelloWorldSimpleContext } from './app/hello-world-simple/hello-world-simple.context';
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
    MatListModule,
    MatTabsModule,
    RouterModule,
    JsonPipe,
  ],
  template: `
    @if (navItems.length > 0) {
      <nav
        mat-tab-nav-bar
        [tabPanel]="tabPanel">
        @for (item of navItems; track item.path) {
          <a
            mat-tab-link
            href="javascript:void(0)"
            [style.text-decoration]="
              (activePath === item.path && !forceShowBaseRootApp) ||
              ('/' === item.path && forceShowBaseRootApp)
                ? 'underline'
                : 'none'
            "
            (click)="navigateTo(item)">
            @if (item.path === '/') {
              <mat-icon
                aria-hidden="false"
                aria-label="Example home icon"
                fontIcon="home"></mat-icon>
            } @else {
              {{ item.label }}
            }
          </a>
        }
      </nav>

      <mat-tab-nav-panel #tabPanel>
        @if (!forceShowBaseRootApp) {
          <router-outlet />
        }
      </mat-tab-nav-panel>
    }
    @if (navItems.length === 0 || forceShowBaseRootApp) {
      <mat-card class="m-2">
        <mat-card-content>
          <h3>Basic app info</h3>
          Name: isomorphic-lib-v21<br />
          Angular version: {{ angularVersion }}<br />
          Taon backend: {{ taonMode }}<br />
        </mat-card-content>
      </mat-card>

      <mat-card class="m-2">
        <mat-card-content>
          <h3>Example users from backend API:</h3>
          <ul>
            @for (user of users(); track user.id) {
              <li>
                {{ user | json }}
                <button
                  mat-flat-button
                  (click)="deleteUser(user)">
                  <mat-icon>delete user</mat-icon>
                </button>
              </li>
            }
          </ul>
          <br />
          <button
            class="ml-1"
            matButton="outlined"
            (click)="addUser()">
            Add new example user with random name
          </button>
        </mat-card-content>
      </mat-card>

      <mat-card class="m-2">
        <mat-card-content>
          <h3>Example hello world from backend API:</h3>
          hello world from backend: <strong>{{ hello$ | async }}</strong>
        </mat-card-content>
      </mat-card>
    }
  `,
})
export class IsomorphicLibV21App {
  navItems = IsomorphicLibV21ClientRoutes.filter(r => r.path !== undefined).map(
    r => ({
      path: r.path === '' ? '/' : `/${r.path}`,
      label: r.path === '' ? 'Home' : `${r.path}`,
    }),
  );

  activatedRoute = inject(ActivatedRoute);

  get activePath(): string {
    return globalThis?.location.pathname?.split('?')[0];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(globalThis?.location.pathname);
  }

  taonMode = UtilsOs.isRunningInWebSQL() ? 'websql' : 'normal nodejs';
  angularVersion = VERSION.full;
  userApiService = inject(UserApiService);
  router = inject(Router);
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

  async deleteUser(userToDelete: User): Promise<void> {
    await this.userApiService.userController
      .deleteById(userToDelete.id)
      .request();
    this.refresh.next();
  }

  async addUser(): Promise<void> {
    const newUser = new User();
    newUser.name = `user-${Math.floor(Math.random() * 1000)}`;
    await this.userApiService.userController.save(newUser).request();
    this.refresh.next();
  }

  forceShowBaseRootApp = false;
  navigateTo(item: { path: string; label: string }): void {
    if (item.path === '/') {
      if (this.forceShowBaseRootApp) {
        return;
      }
      this.forceShowBaseRootApp = true;
      return;
    }
    this.forceShowBaseRootApp = false;
    this.router.navigateByUrl(item.path);
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
export const IsomorphicLibV21ClientRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      return IsomorphicLibV21ClientRoutes.find(r => r.path !== '')!.path!;
    },
  },
  {
    path: 'todo-mvc',
    providers: [
      {
        provide: TAON_CONTEXT,
        useFactory: () => TodoMvcContext,
      },
    ],
    loadChildren: () =>
      import('./app/todo-mvc/todo-mvc.routes').then(m => m.TodoMvcRoutes),
  },
  {
    path: 'hello-world-simple',
    providers: [
      {
        provide: TAON_CONTEXT,
        useFactory: () => HelloWorldSimpleContext,
      },
    ],
    loadChildren: () =>
      import('./app/hello-world-simple/hello-world-simple.routes').then(
        m => m.HelloWorldSimpleRoutes,
      ),
  },
  // PUT ALL ROUTES HERE
];
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
   * In production use specyfic for this context name
   * generated migration object from  ./migrations/index.ts.
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
  await TodoMvcContext.initialize();
  await HelloWorldSimpleContext.initialize();
  // INIT ALL ACTIVE CONTEXTS HERE

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
