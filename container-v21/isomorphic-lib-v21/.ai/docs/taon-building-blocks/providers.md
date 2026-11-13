# Taon providers

Injectable (service like) classes singleton (in context) classes.

Use this class for storing:
 
 -configurations for bother backend and frontend

- resolved environment variables

```ts
@TaonProvider({
  className: 'TaonConfigProvier',
})
export class TaonConfigProvier extends TaonBaseProvider {
  config = {
    lang: 'en',
    country: 'Poland'
  }
  
  SECRET_ENV: string;
  GOOGLE_ID:string;

  async _() {
    //#region @backend
    this.SECRET_ENV = await ENV_NODE_APP_SECRET_ENV();
    //#endregion
    GOOGLE_ID = '123123123123123123123123'
  }
}
```
