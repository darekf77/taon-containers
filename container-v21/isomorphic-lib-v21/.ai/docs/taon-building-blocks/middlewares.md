### Taon middleware and interceptors

Taon middleware lets you intercept backend requests and frontend API calls. Server hooks follow the Express middleware pattern. Client hooks follow the Angular HTTP interceptor pattern and work with Axios responses and RxJS.

Middleware classes are injectable singletons within their Taon context and can participate in inheritance.

| Scope | Server hook | Client hook |
| --- | --- | --- |
| Entire context | `interceptServer()` | `interceptClient()` |
| All methods of one controller | `interceptServerMethod()` | `interceptClientMethod()` |
| One controller method | `interceptServerMethod()` | `interceptClientMethod()` |

Controller-wide and endpoint-specific middleware use the same hooks. Where you register the middleware determines which methods it applies to.

#### Intercept server requests across a context

Implement `interceptServer()` to handle server requests across the context. Call `next()` to continue processing the request.

```ts
@TaonMiddleware({ className: 'ContextServerMiddleware' })
export class ContextServerMiddleware extends TaonBaseMiddleware {
  interceptServer({
    req,
    next,
  }: TaonServerMiddlewareInterceptOptions): Promise<void> | void {
    console.log(req?.url);
    next();
  }
}
```

#### Intercept client requests across a context

Implement `interceptClient()` to handle client API calls across the context. Return `next.handle(req)` to forward the request and pass its response back to the caller.

```ts
@TaonMiddleware({ className: 'ContextClientMiddleware' })
export class ContextClientMiddleware extends TaonBaseMiddleware {
  interceptClient({
    req,
    next,
  }: TaonClientMiddlewareInterceptOptions): Observable<AxiosResponse<any>> {
    console.log(req?.url);
    return next.handle(req);
  }
}
```

#### Intercept a controller method on the server

Use `interceptServerMethod()` for middleware attached to a controller or endpoint. The second argument provides information about the matched endpoint, including its method name, Express path, and HTTP request type. You can use `async` and `await` before calling `next()`.

Set `interceptServer = undefined` to keep this middleware scoped to the controller or endpoint on the server.

```ts
@TaonMiddleware({ className: 'MethodServerMiddleware' })
export class MethodServerMiddleware extends TaonBaseMiddleware {
  interceptServer = undefined;

  interceptServerMethod(
    { next }: TaonServerMiddlewareInterceptOptions,
    { methodName, expressPath }: TaonAdditionalMiddlewareMethodInfo,
  ): Promise<void> | void {
    console.log(methodName, expressPath);
    next();
  }
}
```

#### Intercept a controller method on the client

Use `interceptClientMethod()` to intercept client calls to the controller or endpoint where the middleware is registered. You can use RxJS operators on the response from `next.handle(req)`. This example uses `tap()` to inspect the response status.

Set `interceptClient = undefined` to keep this middleware scoped to the controller or endpoint on the client.

```ts
@TaonMiddleware({ className: 'MethodClientMiddleware' })
export class MethodClientMiddleware extends TaonBaseMiddleware {
  interceptClient = undefined;

  interceptClientMethod(
    { req, next }: TaonClientMiddlewareInterceptOptions,
    { methodName, expressPath }: TaonAdditionalMiddlewareMethodInfo,
  ): Observable<AxiosResponse<any>> {
    console.log(methodName, expressPath);

    return next.handle(req).pipe(
      tap(response => console.log(response.status)),
    );
  }
}
```

#### Apply middleware to every endpoint in a controller

Add the middleware to `@TaonController({ middlewares: ... })`. Spread `parentMiddlewares` to retain the middleware supplied by the parent.

```ts
@TaonController({
  className: 'SessionController',
  middlewares: ({ parentMiddlewares }) => ({
    ...parentMiddlewares,
    MethodServerMiddleware,
  }),
})
export class SessionController extends TaonBaseController {
  @GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async () => 'Hello, world!';
    //#endregion
  }
}
```

#### Apply middleware to one endpoint

Add the middleware to the endpoint decorator’s `middlewares` option. Here, `MethodClientMiddleware` applies only to `helloWorld()`.

The `@websqlFunc` region markers in the controller examples are Taon build directives.

```ts
@TaonController({ className: 'SessionController' })
export class SessionController extends TaonBaseController {
  @PUT({
    middlewares: ({ parentMiddlewares }) => ({
      ...parentMiddlewares,
      MethodClientMiddleware,
    }),
  })
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async () => 'Hello, world!';
    //#endregion
  }
}
```
