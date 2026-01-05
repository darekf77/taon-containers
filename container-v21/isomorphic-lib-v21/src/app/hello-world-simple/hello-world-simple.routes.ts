//#region imports
import { Routes } from '@angular/router';

import { HelloWorldSimpleComponent } from './hello-world-simple.component';
//#endregion

export const HelloWorldSimpleRoutes: Routes = [
  {
    path: '',
    component: HelloWorldSimpleComponent,
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
];