import { Injectable } from '@angular/core'; // @browser
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon } from 'taon/src';

import type { MyEntity } from './my-entity';
import { MyEntityController } from './my-entity.controller';

//#region @browser
@Injectable()
//#endregion
export class MyEntityApiService extends Taon.Base.AngularService {
  protected myEntityController = this.injectController(MyEntityController);

  public get allMyEntities$(): Observable<MyEntity[]> {
    return this.myEntityController
      .getAll()
      .request().observable.pipe(map(res => res.body.json));
  }
}
