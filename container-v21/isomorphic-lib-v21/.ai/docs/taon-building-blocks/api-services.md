### Taon API service

An API service injects Taon controllers and provides an application-scoped
place to adapt requests and responses or maintain state. Avoid `providedIn:
'root'` when the service must be scoped to an injected Taon context.

```ts
@Injectable()
export class UserApiService extends TaonBaseAngularService {
  protected userController = this.inject(UserController);

  getCrudController() {
    return this.userController;
  }

  getAll() {
    return this.userController.getAll()
      .request()
      .observable
      .pipe(map(response => response.body.json));
  }

  async getTime() {
    const response = await this.userController.whatTimeIsIt().request();
    return response.body.text;
  }
}
```

`request().observable` exposes the observable request path; awaiting
`request()` uses the promise path. The response body provides parsed text or
JSON and other response representations according to the controller's
response type.
