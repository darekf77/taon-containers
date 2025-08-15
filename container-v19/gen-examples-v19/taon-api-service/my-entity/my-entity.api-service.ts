//#region imports
import { Injectable } from '@angular/core'; // @browser
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntityController } from './my-entity.controller';
//#endregion

//#region @browser
@Injectable()
//#endregion
export class MyEntityApiService extends Taon.Base.AngularService {
  myEntityController = this.injectController(MyEntityController);
}
