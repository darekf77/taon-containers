//#region imports
import { Taon } from 'taon/src';
import { Raw } from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

import { ChildSessionMiddleware } from './child-session.middleware';
import { JetAnotherMiddleware } from './jet-another.middleware';
import { SessionController } from './session.controller';

//#endregion

@Taon.Controller({
  className: 'ChildSessionController',
  middlewares: ({ parentMiddlewares }) => ({
    JetAnotherMiddleware,
    ...parentMiddlewares,
  }),
})
export class ChildSessionController extends SessionController {
  @Taon.Http.PUT({
    middlewares: ({ parentMiddlewares }) => {
      // console.log('parent stuff', parentMiddlewares);
      return { ChildSessionMiddleware, ...parentMiddlewares };
    },
  })
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return 'hello world';
    };
    //#endregion
  }

  //#region upload form data to server
  @Taon.Http.POST({
    overrideContentType: 'multipart/form-data',
    middlewares: ({ parentMiddlewares }) => ({
      ...parentMiddlewares,
      // BaseFileUploadMiddleware,
    }),
  })
  uploadFormDataToServer(
    @Taon.Http.Param.Body() formData: any,
  ): Taon.Response<any> {
    //#region @backendFunc
    return async (req, res) => {
      // const files = req.files;
      return {};
    };
    //#endregion
  }
}
