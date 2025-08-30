//#region imports
import { Taon, ClassHelpers } from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonUser } from './taon-user';
//#endregion

@Taon.Controller({
  className: 'TaonUserController',
})
export class TaonUserController extends Taon.Base.Controller {}
