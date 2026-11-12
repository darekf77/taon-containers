### Taon controllers

Taon controllers define backend endpoints that frontend code can call through an Angular API service. Inject controllers only in `*.api.service.ts` files. Angular components call the API service.

#### Add a custom endpoint

Use `@TaonController` to define a controller and `@GET()` to expose a method as a GET endpoint. The example below returns a plain string. Keep the `@websqlFunc` region markers in the example because Taon uses them as build directives.

```ts
@TaonController({ className: 'UserController' })
export class UserController extends TaonBaseController {
  @GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async () => 'Hello, world!';
    //#endregion
  }
}
```

#### Generate CRUD endpoints for an entity

Extend `TaonBaseCrudController<User>` and set `entityClassResolveFn` to return the `User` entity class. The base controller provides standard CRUD methods such as `getAll()` and `update()`. You can add custom endpoints alongside those methods.

```ts
@TaonController({ className: 'UserController' })
export class UserController extends TaonBaseCrudController<User> {
  entityClassResolveFn = () => User;

  @GET()
  whatTimeIsIt(): Taon.Response<string> {
    //#region @websqlFunc
    return async () => new Date().toString();
    //#endregion
  }
}
```

### Error handling in controllers

Prefer `Taon.error()` when an endpoint needs to return a structured error. It throws immediately, so execution stops at the call. Supply `message` and `status`, and include `code` when clients need a stable identifier for the error.

| Approach | Behavior |
| --- | --- |
| `Taon.error()` | Recommended for structured errors with an HTTP status and an optional application error code. |
| `throw '…'` | Throws a plain string message. |
| `throw new Error('…')` | Throws an `Error` object with a message and stack trace. |
| `res.status(...).json(...)` | Writes an Express response directly. Prefer `Taon.error()` for Taon endpoints. Return immediately after sending the response to stop the handler. |

The example selects an error-handling approach using the `errorType` query parameter. When the parameter is omitted, the endpoint returns a greeting.

```ts
@TaonController({ className: 'SampleController' })
export class SampleController extends TaonBaseController {
  @GET()
  helloWorld(
    @Query('errorType')
    errorType?: 'short' | 'stack' | 'customCode' | 'taonError',
  ): Taon.Response<string> {
    //#region @websqlFunc
    return async (_req, res) => {
      if (errorType === 'taonError') {
        Taon.error({
          message: 'This is a custom Taon error.',
          code: 'CUSTOM_ERR',
          status: 499,
        });
      }

      if (errorType === 'short') {
        throw 'A short error message.';
      }

      if (errorType === 'stack') {
        throw new Error('An error with a stack trace.');
      }

      if (errorType === 'customCode') {
        res.status(444).json({
          customErrorMessage: 'A custom error response.',
        });
        return;
      }

      return 'Hello, world!';
    };
    //#endregion
  }
}
```
