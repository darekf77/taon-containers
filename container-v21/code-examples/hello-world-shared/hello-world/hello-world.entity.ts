//#region imports
import {
  DateTimeColumn,
  StringColumn,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { HelloWorldDefaultsValues } from './hello-world.constants';
//#endregion

@TaonEntity({
  className: 'HelloWorld',
  createTable: true,
})
export class HelloWorld extends TaonBaseAbstractEntity<HelloWorld> {
  //#region @websql
  @StringColumn(HelloWorldDefaultsValues.description)
  //#endregion
  description?: string;

  //#region @websql
  @DateTimeColumn()
  //#endregion
  modificationDate?: string;
}