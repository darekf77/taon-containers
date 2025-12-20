//#region imports
import { Routes } from '@angular/router';

import { MyEntityComponent } from './my-entity.component';
//#endregion

export const routesMyEntity: Routes = [
  {
    path: '',
    component: MyEntityComponent,
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
];
