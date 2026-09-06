//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { MyEntityEntity } from './my-entity.entity';
//#endregion

@TaonSubscriber<MyEntitySubscriber>({
  className: 'MyEntitySubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class MyEntitySubscriber extends TaonBaseSubscriberForEntity {
  listenTo(): typeof MyEntityEntity {
    return MyEntityEntity;
  }
}
