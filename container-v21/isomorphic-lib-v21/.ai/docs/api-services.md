### Taon api service

Api service is a place where you can:
- inject your taon controllers 
- modify reposnse or request for backend
- keep a state (service i) 

```ts
@Injectable({
  // PLEASE DON'T USE providedIn:'root' - This should not be a singleton for whole application -> only for specyfic injected context
})
export class UserApiService extends TaonBaseAngularService {
  // for now - only injectable here are controllers
  // controllers should be a "glue" between backend and frontend
  userControlller = this.injectController(UserController);

  getAll() { // observables api
    return this.userControlller.getAll()
      .request({
        // fetch request config
      })
      .observable
      .pipe(map(r => r.body.json));
  }

  async getTime() { // proimses api
    const data = await this.userControlller
     .whatTimeIsIt()
     .request();
    
    return data.body.text;

    // data.body.numericValue numeric value from text response
    // data.body.booleanValue  boolean value from text response     
    // data.body.json mapped with class instances json
    // data.body.rawJson // raw json class or object
    // data.body.native fetch repsponse with .blob() etc.
    //
  }
}
```
