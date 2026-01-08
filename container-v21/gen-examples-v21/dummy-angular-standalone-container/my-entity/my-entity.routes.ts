//#region imports
import { Routes } from '@angular/router';

import { MyEntityContainer } from './my-entity.container';
//#endregion

export const MyEntityRoutes: Routes = [
  {
    path: '',
    component: MyEntityContainer,
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
];