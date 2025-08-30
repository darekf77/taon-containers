//#region imports
import { Taon, ClassHelpers } from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonSession } from './taon-session';
//#endregion

@Taon.Controller({
  className: 'TaonSessionController',
})
export class TaonSessionController extends Taon.Base.Controller<TaonSession> {

}
