//#region imports
import { Injectable } from '@angular/core'; // @browser
import { Taon, TaonBaseAngularService } from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntityController } from './my-entity.controller';
//#endregion

@Injectable()
export class MyEntityApiService extends TaonBaseAngularService {
  myEntityController = this.injectController(MyEntityController);
}
