//#region imports
import {
  DateTimeColumn,
  StringColumn,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntityDefaultsValues } from './my-entity.constants';
//#endregion

@TaonEntity({
  className: 'MyEntity',
  createTable: true,
})
export class MyEntity extends TaonBaseAbstractEntity<MyEntity> {
  //#region @websql
  @StringColumn(MyEntityDefaultsValues.description)
  //#endregion
  description?: string;

  //#region @websql
  @DateTimeColumn()
  //#endregion
  modificationDate?: string;
}
