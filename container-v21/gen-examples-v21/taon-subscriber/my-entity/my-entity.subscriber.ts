//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { MyEntity } from './my-entity.entity';
//#endregion

@TaonSubscriber<MyEntitySubscriber>({
  className: 'MyEntitySubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class MyEntitySubscriber extends TaonBaseSubscriberForEntity {
  listenTo(): typeof MyEntity {
    return MyEntity;
  }
}
