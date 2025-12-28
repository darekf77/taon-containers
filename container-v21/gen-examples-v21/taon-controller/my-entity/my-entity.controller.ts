//#region imports
import { GET, Taon, TaonBaseCrudController, TaonController } from 'taon/src';
import { Raw } from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

import { MyEntity } from './my-entity';
//#endregion

@TaonController({
  className: 'MyEntityController',
})
export class MyEntityController extends TaonBaseCrudController<MyEntity> {
  entityClassResolveFn: () => typeof MyEntity = () => MyEntity;

  @GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return 'hello world';
    };
    //#endregion
  }
}
