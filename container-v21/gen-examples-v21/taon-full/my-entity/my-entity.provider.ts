//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonMyEntityConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'MyEntityProvider',
})
export class MyEntityProvider extends TaonBaseProvider {
  enabledMyEntityOption: boolean = true;
  config = new TaonMyEntityConfig();
  clone() {
    return {
      enabledMyEntityOption: this.enabledMyEntityOption,
      config: this.config.clone(),
    };
  }
}
