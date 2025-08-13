//#region imports
import { Taon, BaseContext } from 'taon/src';
import { getBaseCliWorkerDatabaseConfig } from 'tnp-helpers/src';

import { MyEntity } from './my-entity';
import { MyEntityController } from './my-entity.controller';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

const appId = 'my-entity-worker-app.project.worker';

export const MyEntityContext = Taon.createContextTemplate(() => ({
  contextName: 'MyEntityContext',
  appId,
  skipWritingServerRoutes: true,
  contexts: { BaseContext },
  repositories: { MyEntityRepository },
  entities: { MyEntity },
  controllers: { MyEntityController },
  ...getBaseCliWorkerDatabaseConfig(
    appId,
    'DROP_DB+MIGRATIONS',
  ),
}))
