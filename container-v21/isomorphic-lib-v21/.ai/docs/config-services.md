### Taon api service

Config service is a place where you can:
- inject your taon provieder with context backend/fronend config

```ts
@Injectable({
  // PLEASE DON'T USE providedIn:'root' - This should not be a singleton for whole application -> only for specyfic injected context
})
export class UserConfigService extends TaonBaseAngularService {
  // for now - only injectable here are controllers
  // controllers should be a "glue" between backend and frontend
  userProvider = this.injectProvider(UserProvider);
 

  get isLoginAvailable(): boolean {
    return this.userProvider.login.enabled;
  }
}
```
