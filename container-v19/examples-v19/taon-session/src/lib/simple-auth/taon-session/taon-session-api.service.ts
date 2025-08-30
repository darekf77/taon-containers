import { Injectable } from '@angular/core'; // @browser
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon } from 'taon/src';

import type { TaonSession } from './taon-session';
import { TaonSessionController } from './taon-session.controller';

//#region @browser
@Injectable()
//#endregion
export class TaonSessionApiService extends Taon.Base.AngularService {
  protected taonSessionController = this.injectController(
    TaonSessionController,
  );
}
