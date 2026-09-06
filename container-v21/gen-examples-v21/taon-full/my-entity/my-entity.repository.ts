//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { MyEntityEntity } from './my-entity.entity';
//#endregion

@TaonRepository({
  className: 'MyEntityRepository',
})
export class MyEntityRepository extends TaonBaseRepository<MyEntityEntity> {
  entityClassResolveFn: () => typeof MyEntityEntity = () => MyEntityEntity;

  /**
   * TODO remove this demo example method
   */
  async countEntitesWithEvenId(): Promise<number> {
    //#region @websqlFunc
    const result = await this.count({
      where: {
        id: Raw(alias => `${alias} % 2 = 0`),
      },
    });
    return result;
    //#endregion
  }
}
