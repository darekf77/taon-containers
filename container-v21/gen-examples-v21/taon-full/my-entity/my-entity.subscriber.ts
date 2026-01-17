//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { MyEntity } from './my-entity.entity';
import { MyEntityProvider } from './my-entity.provider';
//#endregion

@TaonSubscriber<MyEntitySubscriber>({
  className: 'MyEntitySubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class MyEntitySubscriber extends TaonBaseSubscriberForEntity {
  myEntityProvider = this.injectProvider(MyEntityProvider);
  listenTo(): typeof MyEntity {
    return MyEntity;
  }
}
