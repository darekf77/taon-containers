//#region imports
import { CoreModels, Helpers, UtilsTerminal, _ } from 'tnp-core/src';
import { BaseCliWorkerTerminalUI, BaseWorkerTerminalActionReturnType } from 'tnp-helpers/src';

import { MyEntityWorker } from './my-entity.worker';
//#endregion

export class MyEntityTerminalUI extends BaseCliWorkerTerminalUI<MyEntityWorker> {

  protected async headerText(): Promise<string> {
    return 'My Entity Worker';
  }

  textHeaderStyle(): CoreModels.CfontStyle {
    return 'block';
  }

  getWorkerTerminalActions(options?: {
    exitIsOnlyReturn?: boolean;
    chooseAction?: boolean;
  }): BaseWorkerTerminalActionReturnType {
    //#region @backendFunc
    const myActions: BaseWorkerTerminalActionReturnType = {
      getStuffFromBackend: {
        name: 'Get stuff from backend',
        action: async () => {
          Helpers.info(`Stuff from backend will be fetched`);
          const ctrl = await this.worker.getControllerForRemoteConnection();
          const list = (await ctrl.getEntities().request())?.body.json || [];
          console.log(list.map( c => `- ${c.id} ${c.description}` ).join('\n'));
          Helpers.info(`Fetched ${list.length} entities`);
          await UtilsTerminal.pressAnyKeyToContinueAsync({
            message: 'Press any key to go back to main menu',
          });
        },
      },
    };

    return {
      ...this.chooseAction,
      ...myActions,
      ...super.getWorkerTerminalActions({ ...options, chooseAction: false }),
    };
    //#endregion
  }


}
