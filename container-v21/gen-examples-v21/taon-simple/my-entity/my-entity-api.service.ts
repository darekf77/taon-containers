import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { MyEntityController } from './my-entity.controller';

@Injectable()
export class MyEntityApiService extends TaonBaseAngularService {
  protected myEntityController = this.injectController(MyEntityController);

  public hello(): Observable<string> {
    return this.myEntityController.helloWord('my-entity')
      .request!().observable.pipe(map(res => res.body.text!));
  }
}
