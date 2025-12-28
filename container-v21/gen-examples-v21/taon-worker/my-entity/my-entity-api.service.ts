//#region imports
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { MyEntity } from './my-entity';
import { MyEntityController } from './my-entity.controller';
//#endregion

@Injectable()
export class MyEntityApiService extends TaonBaseAngularService {
  private myEntityController = this.injectController(MyEntityController);

  public get allMyEntities$(): Observable<MyEntity[]> {
    return this.myEntityController.getEntities().request!().observable.pipe(
      map(res => res.body.json),
    );
  }
}
