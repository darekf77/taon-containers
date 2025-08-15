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
import { UtilsOs } from 'tnp-core/src';

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
  imports: [CommonModule],
  exports: [SessionMiddlewareComponent],
})
export class SessionMiddlewareModule {}
//#endregion
//#endregion

//#region  isomorphic-lib-v19 context
var MainContext = Taon.createContext(() => ({
  ...HOST_CONFIG['MainContext'],
  contexts: { BaseContext },
  middlewares: { SessionMiddleware },
  controllers: { SessionController },
  disabledRealtime: true,
}));
//#endregion

async function start(): Promise<void> {
  await MainContext.initialize();
  //#region @backend
  console.log(`Hello in NodeJs backend! os=${os.platform()}`);
  //#endregion

  if (UtilsOs.isBrowser) {
    const message = (
      await MainContext.getClassInstance(SessionController).helloWorld()
        .received
    ).body.text;
    console.log({
      'from backend': message,
    });
  }
}

export default start;
