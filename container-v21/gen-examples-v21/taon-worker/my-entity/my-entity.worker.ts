//#region imports
import { _ } from 'tnp-core/src';
import { BaseCliWorker } from 'tnp-helpers/src';

import { MyEntityContext } from './my-entity.context';
import { MyEntityController } from './my-entity.controller';
import { MyEntityTerminalUI } from './my-entity.terminal-ui';
//#endregion

export class MyEntityWorker extends BaseCliWorker<
MyEntityController,
  MyEntityTerminalUI
> {

  //#region properties
  // TODO 'as any' for some reason is necessary
  // TypeScript d.ts generation bug
  workerContextTemplate = MyEntityContext as any;

  // TODO ts ignore needed for some reason
  // @ts-ignore
  terminalUI = new MyEntityTerminalUI(this);
  controllerClass = MyEntityController;
  //#endregion

  //#region constructor
  constructor(
    /**
     * unique id for service
     */
    serviceID: string,
    /**
     * external command that will start service
     */
    startCommand: string,
  ) {
    // replace '0.0.0' with CURRENT_PACKAGE_VERSION for versioning
    super(serviceID, startCommand, '0.0.0');
  }
  //#endregion

}
