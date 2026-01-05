//#region imports
import { Routes } from '@angular/router';

import { TodoMvcComponent } from './todo-mvc.component';
//#endregion

export const TodoMvcRoutes: Routes = [
  {
    path: '',
    component: TodoMvcComponent,
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
];
