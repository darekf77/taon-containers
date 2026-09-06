//#region imports
import { createContextTemplate, TaonBaseContext } from 'taon/src';
import { getBaseCliWorkerDatabaseConfig } from 'tnp-helpers/src';

import { MyEntityEntity } from './my-entity.entity';
import { MyEntityController } from './my-entity.controller';
import { MyEntityRepository } from './my-entity.repository';
//#endregion

const appId = 'my-entity-worker-app.project.worker';

export const MyEntityContext = createContextTemplate(() => ({
  contextName: 'MyEntityContext',
  appId,
  skipWritingServerRoutes: true,
  contexts: { TaonBaseContext },
  repositories: { MyEntityRepository },
  entities: { MyEntityEntity },
  controllers: { MyEntityController },
  ...getBaseCliWorkerDatabaseConfig(
    appId,
    'DROP_DB__RUN_MIGRATIONS',
  ),
}))
