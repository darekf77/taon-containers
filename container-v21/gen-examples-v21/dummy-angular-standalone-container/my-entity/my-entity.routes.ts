//#region imports
import { Routes } from '@angular/router';
import { adminLazyRoute } from '@taon-dev/ui/src';
//#endregion

export const MyEntityRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./my-entity.container').then(m => m.MyEntityContainer),
    children: [
      // adminLazyRoute({
      //   path: 'dashboard',
      //   menuItem: 'Dashboard',
      //   icon: 'dashboard',
      //   expandable: false,
      //   loader: () =>
      //     import('./anothermodule.routes').then(m => m.DashboardRoutes),
      // }),
    ],
  },
];

/**
 * By default exporting MyEntityRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
export default MyEntityRoutes;
