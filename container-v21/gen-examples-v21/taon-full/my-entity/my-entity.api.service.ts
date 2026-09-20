//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { MyEntityEntity } from './my-entity.entity';
import { MyEntityController } from './my-entity.controller';
//#endregion

@Injectable()
export class MyEntityApiService extends TaonBaseAngularService {
  private myEntityController = this.injectController(MyEntityController);

  public get allMyEntities$(): Observable<MyEntityEntity[]> {
    return this.myEntityController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.myEntityController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}
