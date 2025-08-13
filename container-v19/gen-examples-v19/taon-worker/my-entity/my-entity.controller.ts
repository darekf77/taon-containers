//#region imports
import { Taon, ClassHelpers } from 'taon/src';
import { _ } from 'tnp-core/src';
import { BaseCliWorkerController } from 'tnp-helpers/src';

import { MyEntity } from './my-entity';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

@Taon.Controller({
  className: 'MyEntityController',
})
export class MyEntityController extends BaseCliWorkerController {
  myEntityRepository = this.injectCustomRepo(MyEntityRepository);

  // @ts-ignore
  @Taon.Http.GET()
  getEntities(): Taon.Response<MyEntity[]> {
    //#region @backendFunc
    return async (req, res) => {
      return this.myEntityRepository.find();
    };
    //#endregion
  }

}
