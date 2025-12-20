//#region imports
import { Taon } from 'taon/src';
import { Raw } from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

import { MyEntity } from './my-entity';
//#endregion

@Taon.Controller({
  className: 'MyEntityController',
})
export class MyEntityController extends Taon.Base.CrudController<MyEntity> {
  entityClassResolveFn: () => typeof MyEntity = () => MyEntity;

  @Taon.Http.GET()
   helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return 'hello world';
    }
    //#endregion
  }
}
