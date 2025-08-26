//#region imports
import { Taon } from 'taon/src';
import { Raw } from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

import { SessionMiddleware } from './session.middleware';

//#endregion

@Taon.Controller({
  className: 'SessionController',
})
export class SessionController extends Taon.Base.Controller {
  @Taon.Http.PUT({
    middlewares: ({ parentMiddlewares }) => ({
      ...parentMiddlewares,
      SessionMiddleware,
    }),
  })
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return 'hello world';
    };
    //#endregion
  }

  @Taon.Http.GET({
    middlewares: ({ parentMiddlewares }) => ({
      ...parentMiddlewares,
      SessionMiddleware,
    }),
  })
  thisIsNice(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return 'this is nice !';
    };
    //#endregion
  }
}
