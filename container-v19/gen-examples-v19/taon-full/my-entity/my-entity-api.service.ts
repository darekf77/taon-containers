import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon } from 'taon/src';

import type { MyEntity } from './my-entity';
import { MyEntityController } from './my-entity.controller';

@Injectable()
export class MyEntityApiService extends Taon.Base.AngularService {
  private myEntityController = this.injectController(MyEntityController);

  public get allMyEntities$(): Observable<MyEntity[]> {
    return this.myEntityController
      .getAll()
      .request().observable.pipe(map(res => res.body?.json));
  }

  public helloWorld(user): Observable<string> {
    return this.myEntityController
      .helloWord(user)
      .request().observable.pipe(map(res => res.responseText as string));
  }
}
