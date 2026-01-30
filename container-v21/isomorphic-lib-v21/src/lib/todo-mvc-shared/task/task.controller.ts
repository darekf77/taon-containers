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

import { Task } from './task.entity';
//#endregion

@TaonController({
  className: 'TaskController',
})
export class TaskController extends TaonBaseCrudController<Task> {
  entityClassResolveFn: () => typeof Task = () => Task;

  //#region methods & getters / hello world
  @GET()
  helloWord(@Query('yourName') yourName: string): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      const numOfEntities = await this.db.count();
      return (
        `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaskController)} ` +
        `controller..  ${numOfEntities} entites in db..`
      );
    };
    //#endregion
  }
  //#endregion
}
