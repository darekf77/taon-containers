//#region imports
import {
  CustomColumn,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntityDefaultsValues } from './my-entity.defaults-values';
//#endregion

@TaonEntity({
  className: 'MyEntity',
  createTable: true,
})
export class MyEntity extends TaonBaseAbstractEntity<MyEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: MyEntityDefaultsValues.description,
  })
  //#endregion
  description?: string;
}
