//#region imports
import { StringColumn, Taon, TaonBaseAbstractEntity, TaonEntity } from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntityDefaultsValues } from './my-entity.defaults-values';
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
}
