//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { MyEntityProvider } from './my-entity.provider';
//#endregion

@Injectable()
export class MyEntityConfigService extends TaonBaseAngularService {
  private myEntityProvider = this.injectProvider(MyEntityProvider);

  get isEnableOption() {
    return this.myEntityProvider.enabledMyEntityOption;
  }
}
