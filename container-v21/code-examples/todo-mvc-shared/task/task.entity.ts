//#region imports
import {
  BooleanColumn,
  DateTimeColumn,
  StringColumn,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaskDefaultsValues } from './task.constants';
//#endregion

@TaonEntity({
  className: 'Task',
  createTable: true,
})
export class Task extends TaonBaseAbstractEntity<Task> {
  //#region @websql
  @StringColumn(TaskDefaultsValues.title)
  //#endregion
  title?: string;

  //#region @websql
  @DateTimeColumn()
  //#endregion
  modificationDate?: string;

  //#region @websql
  @BooleanColumn(false)
  //#endregion
  completed: boolean;
}
