import type { Task } from './task.entity';

export const TaskDefaultsValues = {
  title: '',
  version: 0,
  id: void 0,
} as Partial<Task>;
