//#region imports
import { Taon, ClassHelpers, TaonController, GET } from 'taon/src';
import { _ } from 'tnp-core/src';
import { TaonBaseCliWorkerController } from 'tnp-helpers/src';

import { MyEntity } from './my-entity.entity';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

@TaonController({
  className: 'MyEntityController',
})
export class MyEntityController extends TaonBaseCliWorkerController {
  myEntityRepository = this.injectCustomRepo(MyEntityRepository);

  @GET()
  getEntities(): Taon.Response<MyEntity[]> {
    //#region @backendFunc
    return async (req, res) => {
      return this.myEntityRepository.find();
    };
    //#endregion
  }

}
