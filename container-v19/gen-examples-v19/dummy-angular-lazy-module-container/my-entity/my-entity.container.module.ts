//#region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyEntityContainer } from './my-entity.container';
//#endregion

const routes: Routes = [
  {
    path: '',
    component: MyEntityContainer,
    // pathMatch: 'full' // => when using variables in other routers
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
  // {
  //   path: 'other/:otherId',
  //   loadChildren: () => import('othermodule')
  //     .then(m => m.OtherLazyModule),
  // },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MyEntityContainer],
})
export class MyEntityContainerModule { }

