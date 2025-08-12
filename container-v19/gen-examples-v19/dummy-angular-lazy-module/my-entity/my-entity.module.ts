//#region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyEntityComponent } from './my-entity.component';
import { routesMyEntity } from './my-entity.routes';
//#endregion

@NgModule({
  //#region module options
  imports: [
    CommonModule,
    RouterModule.forChild(routesMyEntity),
  ],
  declarations: [MyEntityComponent],
  //#endregion
})
export class MyEntityModule { }

