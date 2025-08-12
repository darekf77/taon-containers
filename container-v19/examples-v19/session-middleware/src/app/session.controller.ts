//#region imports
import { Taon } from 'taon/src';
import { Raw } from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';

//#endregion

@Taon.Controller({
  className: 'SessionController',
})
export class SessionController extends Taon.Base.Controller {
  @Taon.Http.GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return 'hello world';
    };
    //#endregion
  }
}
