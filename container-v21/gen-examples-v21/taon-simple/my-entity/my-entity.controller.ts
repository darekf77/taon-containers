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

import { MyEntityEntity } from './my-entity.entity';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

@TaonController<MyEntityController>({
  className: 'MyEntityController',
})
export class MyEntityController extends TaonBaseCrudController<MyEntityEntity> {
  entityClassResolveFn: () => typeof MyEntityEntity = () => MyEntityEntity;

  myEntityRepository = this.injectCustomRepository(MyEntityRepository);

  //#region methods & getters / hello world
  @GET()
  helloWord(@Query('yourName') yourName: string): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      const numOfEntities = await this.db.count();
      return (
        `Hello ${yourName || 'world'} from ${ClassHelpers.getName(MyEntityController)} ` +
        `controller..  ${numOfEntities} entites in db..`
      );
    };
    //#endregion
  }
  //#endregion
}
