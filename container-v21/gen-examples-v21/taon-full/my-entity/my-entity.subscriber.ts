//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { MyEntityEntity } from './my-entity.entity';
import { MyEntityProvider } from './my-entity.provider';
//#endregion

@TaonSubscriber<MyEntitySubscriber>({
  className: 'MyEntitySubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class MyEntitySubscriber extends TaonBaseSubscriberForEntity {
  private readonly myEntityProvider = this.injectProvider(MyEntityProvider);
  listenTo(): typeof MyEntityEntity {
    return MyEntityEntity;
  }
}
