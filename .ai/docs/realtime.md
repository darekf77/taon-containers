# Realtime communications

Depending on where you use you backend/frontend - taon framework uses different
mechanism for realtime communication:

- normal NodeJs backend => TCP(upgrade) socket communication based on socket.io (UDP in future)
- electron backend => IPC for realtime communication
- websql browser backend => mock of realtime communication based on RxJS library
- cloudfalre (realtime not supported)

You can listen/subscribe to custom events or entities events in every simple fashion.

```ts
@TaonSubscriber({
  className: 'RealtimeClassSubscriber',
})
export class RealtimeClassSubscriber extends TaonBaseSubscriberForEntity {
  listenTo() {
    return UserEntity;
  }

  afterInsert(entity: any) {
    console.log(`AFTER INSERT: `, entity);
    MainContext.realtime.server.triggerEntityTableChanges(UserEntity);
  }
}

// listen change on backend
async function start() {
 MainContext.realtime.server
  .listenChangesCustomEvent(saveNewUserEventKey)
  .subscribe(async () => {
    console.log('save new user event');
    await realtimeUserController.saveNewUser();
  });
}

  // listen changes on frontend
export class RealtimeClassSubscriberComponent {  
  ngOnInit(): void {
    console.log('realtime client subscribers start listening!');

    MainContext.realtime.client
      .listenChangesEntityTable(UserEntity)
      .pipe(untilDestroyed(this), debounceTime(1000))
      .subscribe(message => {
        console.log('realtime message from class subscriber ', message);
      });
  }
}
```
