//#region imports
import { Taon, TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

import { Task } from './task.entity';
//#endregion

@TaonRepository({
  className: 'TaskRepository',
})
export class TaskRepository extends TaonBaseRepository<Task> {
  entityClassResolveFn: () => typeof Task = () => Task;

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
