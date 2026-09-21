//#region imports
import { Routes } from '@angular/router';
//#endregion

export const MyEntityRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./my-entity.component').then(m => m.MyEntityComponent),
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
// export default MyEntityRoutes;
