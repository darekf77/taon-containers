//#region imports
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  GET,
  Query,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntity } from './my-entity.entity';
//#endregion

@TaonController({
  className: 'MyEntityController',
})
export class MyEntityController extends TaonBaseCrudController<MyEntity> {
  entityClassResolveFn: () => typeof MyEntity = () => MyEntity;

  //#region methods & getters / hello world
  @GET()
  helloWord(@Query('yourName') yourName: string): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      const numOfEntities = await this.db.count();
      return (
        `Hello ${yourName || 'world'} from ${ClassHelpers} ` +
        `controller..  ${numOfEntities} entites in db..`
      );
    };
    //#endregion
  }
  //#endregion
}
