//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { MyEntityEntity } from './my-entity.entity';
//#endregion

@TaonRepository({
  className: 'MyEntityKvRepository',
})
export class MyEntityKvRepository extends TaonBaseKvRepository<{
  usersToNotify: MyEntityEntity[];
}> {
  async notifyUsers(users: MyEntityEntity[]) {
    this.set('usersToNotify', users);
  }
}
