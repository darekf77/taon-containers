//#region imports
import { Subject } from 'rxjs';
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@Taon.Provider({
  className: 'TaonSessionProvier',
})
export class TaonSessionProvier extends Taon.Base.Provider {

  private isAuthenticated = new Subject<boolean>();



}
