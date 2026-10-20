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

import { MyEntityEntity } from './my-entity.entity';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

@TaonController<MyEntityController>({
  className: 'MyEntityController',
  // allowedMethods: []
})
export class MyEntityController extends TaonBaseCrudController<
  MyEntityEntity,
  {
    /* file upload query params type */
  },
  MyEntityController
> {
  entityClassResolveFn: () => typeof MyEntityEntity = () => MyEntityEntity;

  private readonly myEntityRepository =
    this.injectCustomRepo(MyEntityRepository);

  //#region methods / hello world
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
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(MyEntityController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion

  //#region methods / get all entities
  @GET()
  getEntities(): Taon.Response<MyEntityEntity[]> {
    //#region @backendFunc
    return async (req, res) => {
      // @ts-ignore
      return this.deploymentsRepository.find();
    };
    //#endregion
  }
  //#endregion
}
