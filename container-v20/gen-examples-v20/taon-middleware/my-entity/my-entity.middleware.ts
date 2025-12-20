//#region imports
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@Taon.Middleware({
  className: 'MyEntityMiddleware',
})
export class MyEntityMiddleware extends Taon.Base.Middleware {



}
