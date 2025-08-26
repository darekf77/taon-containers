//#region imports
import * as os from 'os'; // @backend

import { CommonModule } from '@angular/common'; // @browser
import { NgModule, inject, Injectable } from '@angular/core'; // @browser
import { Component, OnInit } from '@angular/core'; // @browser
import { VERSION } from '@angular/core'; // @browser
import Aura from '@primeng/themes/aura'; // @browser
import { MaterialCssVarsModule } from 'angular-material-css-vars'; // @browser
import { providePrimeNG } from 'primeng/config'; // @browser
import { Observable, map } from 'rxjs';
import { Taon, BaseContext, TAON_CONTEXT } from 'taon/src';
import { TaonFullMaterialModule } from 'taon-ui/src'; // @browser
import { UtilsOs } from 'tnp-core/src';

import { ChildSessionController } from './app/child-session.controller';
import { ChildSessionMiddleware } from './app/child-session.middleware';
import { JetAnotherMiddleware } from './app/jet-another.middleware';
import { SessionController } from './app/session.controller';
import { SessionMiddleware } from './app/session.middleware';
import { HOST_CONFIG } from './app.hosts';
import { APP_ID } from './lib/build-info._auto-generated_';
//#endregion

//#region  session-middleware component
//#region @browser
@Component({
  standalone: false,
  template: 'hello world fromr session-middleware',
})
export class SessionMiddlewareComponent {}
//#endregion
//#endregion

//#region  session-middleware module
//#region @browser
@NgModule({
  declarations: [SessionMiddlewareComponent],
  imports: [CommonModule, TaonFullMaterialModule],
  exports: [SessionMiddlewareComponent],
})
export class SessionMiddlewareModule {}
//#endregion
//#endregion

//#region  isomorphic-lib-v19 context
var MainContext = Taon.createContext(() => ({
  ...HOST_CONFIG['MainContext'],
  contexts: { BaseContext },
  middlewares: {
    SessionMiddleware,
    ChildSessionMiddleware,
    JetAnotherMiddleware,
  },
  controllers: { SessionController, ChildSessionController },
  disabledRealtime: true,
}));
//#endregion

async function start(): Promise<void> {
  await MainContext.initialize();
  //#region @backend
  console.log(`Hello in NodeJs backend! os=${os.platform()}`);
  //#endregion

  if (UtilsOs.isBrowser) {
    // console.log({
    //   'from backend': (
    //     await MainContext.getClassInstance(SessionController)
    //       .helloWorld()
    //       .request()
    //   ).body.text,
    // });

    console.log({
      'from backend': (
        await MainContext.getClassInstance(ChildSessionController)
          .helloWorld()
          .request()
      ).body.text,
    });

    // console.log({
    //   'from backend': (
    //     await MainContext.getClassInstance(SessionController)
    //       .thisIsNice()
    //       .request()
    //   ).body.text,
    // });
  }
}

export default start;
