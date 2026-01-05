//#region imports
import { Taon, TaonBaseContext } from 'taon/src';

import { Task } from './task.entity';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
//#endregion

export const TaskContext = Taon.createContext(() => ({
  contextName: 'TaskContext',
  abstract: true,
  repositories: { TaskRepository },
  contexts: { TaonBaseContext },
  entities: { Task },
  controllers: { TaskController },
}));
