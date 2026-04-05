import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { HelloWorldController } from './hello-world.controller';

@Injectable()
export class HelloWorldApiService extends TaonBaseAngularService {
  protected helloWorldController = this.injectController(HelloWorldController);

  public helloWorldMessage(): Observable<string> {
    return this.helloWorldController
      .helloWorld()
      .request()!
      .observable.pipe(map(response => response.body.text));
  }
}
