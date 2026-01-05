//#region imports
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  GET,
  Query,
  TaonBaseController,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { HelloWorld } from './hello-world.entity';
//#endregion

@TaonController({
  className: 'HelloWorldController',
})
export class HelloWorldController extends TaonBaseController {
  @GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => 'hello world';
    //#endregion
  }
}
