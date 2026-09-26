//#region imports
import {
  CustomColumn,
  Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { MyEntityDefaultsValues } from './my-entity.constants';
//#endregion

@TaonEntity<MyEntityEntity>({
  className: 'MyEntityEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': MyEntityEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class MyEntityEntity extends TaonBaseAbstractEntity<MyEntityEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: MyEntityDefaultsValues.description,
  })
  //#endregion
  description?: string;
}
