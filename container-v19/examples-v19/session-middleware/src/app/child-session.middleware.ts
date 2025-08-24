//#region imports
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@Taon.Middleware({
  className: 'ChildSessionMiddleware',
})
export class ChildSessionMiddleware extends Taon.Base.Middleware {



}