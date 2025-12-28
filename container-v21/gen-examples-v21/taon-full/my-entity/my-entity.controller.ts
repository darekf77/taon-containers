//#region imports
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  Query,
  GET,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntity } from './my-entity';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

@TaonController({
  className: 'MyEntityController',
})
export class MyEntityController extends TaonBaseCrudController<MyEntity> {
  entityClassResolveFn: () => typeof MyEntity = () => MyEntity;

  myEntityRepository = this.injectCustomRepo(MyEntityRepository);

  //#region methods & getters / hello world
  /**
   * TODO remove this demo example method
   */
  @GET()
  helloWord(@Query('yourName') yourName: string): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      const numOfEntities = await this.db.count();
      const numberOfEvenEntities =
        await this.myEntityRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}
