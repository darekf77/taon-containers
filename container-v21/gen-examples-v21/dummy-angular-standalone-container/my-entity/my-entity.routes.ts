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

/**
 * By default exporting MyEntityRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
export default MyEntityRoutes;
