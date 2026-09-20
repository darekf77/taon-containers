import type { MyEntityEntity } from './my-entity.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const MyEntityDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<MyEntityEntity>;

export enum MyEntityErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const MyEntityTranslationErorsMap = new Map([
  [MyEntityErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);
