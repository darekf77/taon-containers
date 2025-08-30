import { Injectable } from '@angular/core'; // @browser
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon } from 'taon/src';

import type { TaonUser } from './taon-user';
import { TaonUserController } from './taon-user.controller';

//#region @browser
@Injectable()
//#endregion
export class TaonUserApiService extends Taon.Base.AngularService {
  protected taonUserController = this.injectController(TaonUserController);
}
