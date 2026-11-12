
### Taon subscribers

Injectable classes for subscribing to
entity events base on <https://typeorm.io/listeners-and-subscribers>

You should use Subscribers only inside server code.

```ts
@TaonSubscriber({
  className: 'TaonSubscriber',
})
export class TaonSubscriber extends TaonBaseSubscriberForEntity {
  listenTo() {
    return UserEntity;
  }

  afterInsert(entity: any) {
    console.log(`AFTER INSERT: `, entity);
    MainContext.realtime.server.triggerEntityTableChanges(UserEntity);
  }
}
```
