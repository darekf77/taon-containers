//#region imports
import { StringColumn, Taon, TaonBaseAbstractEntity, TaonEntity } from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntityDefaultsValues } from './my-entity.constants';
//#endregion

@TaonEntity({
  className: 'MyEntityEntity',
  createTable: true,
})
export class MyEntityEntity extends TaonBaseAbstractEntity<MyEntityEntity> {
  //#region @websql
  @StringColumn(MyEntityDefaultsValues.description)
  //#endregion
  description?: string;
}
