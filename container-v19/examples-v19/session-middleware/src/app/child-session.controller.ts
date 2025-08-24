//#region imports
import { Taon } from 'taon/src';
import { Raw } from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

import { ChildSessionMiddleware } from './child-session.middleware';
import { SessionController } from './session.controller';

//#endregion

@Taon.Controller({
  className: 'ChildSessionController',
})
export class ChildSessionController extends SessionController {

  @Taon.Http.PUT({
    middlewares: parent => ({ ...parent, ChildSessionMiddleware }),
  })
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return 'hello world';
    };
    //#endregion
  }

}
