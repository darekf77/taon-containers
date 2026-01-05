import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { MyEntity } from './my-entity.entity';
import { MyEntityController } from './my-entity.controller';

@Injectable()
export class MyEntityApiService extends TaonBaseAngularService {
  protected myEntityController = this.injectController(MyEntityController);

  public get allMyEntities$(): Observable<MyEntity[]> {
    return this.myEntityController.getAll().request!().observable.pipe(
      map(res => res.body.json),
    );
  }
}
