//#region imports
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { SessionMiddleware } from './session.middleware';
//#endregion

@Taon.Middleware({
  className: 'ChildSessionMiddleware',
})
export class ChildSessionMiddleware extends SessionMiddleware {

  name = 'ChildSessionMiddleware';

}
