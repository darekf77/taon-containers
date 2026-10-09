
### Taon middlewares

Taon middlewares/interceptor are inspired by express js middlewares
and angular http interceptors. Isomorphic nature of middlewares 
gives you great control over you backend and frontend requests.
Middlewares just like other taon building blocks are injectable
(singleton classes) and works well with inheritance.

There are 3 way of using taon middlewares/interceptors:

- in whole context (implement interceptServer or interceptServer)

- in specific controller for all methods 
(implement only interceptServerMethod or interceptClientMethod)

- in specific controller method  
(implement only interceptServerMethod or interceptClientMethod)

```ts
@TaonMiddleware({
  className: 'MyMiddlewareInterceptor',
})
export class MyMiddlewareInterceptor extends TaonBaseMiddleware {

  /**
   * if you want your interceptor to NOT BE global in context.. set:
   * interceptServer = undefined
   */
  interceptServer({ req, res, next, }: TaonServerMiddlewareInterceptOptions): Promise<void> | void {
    console.log('intercepting server request in whole context', req?.url);
    next();
  }

  /**
   * if you want your interceptor to NOT BE global in context.. set:
   * interceptClient = undefined
   */
  interceptClient({
    req,
    next,
  }: TaonClientMiddlewareInterceptOptions): Observable<AxiosResponse<any>> {
    console.log('intercepting evert client request in whole context', req?.url);
    return next.handle(req);
  }

  /**
   * Similar to express js middleware
   */
  interceptServerMethod(
    { req, res, next }: TaonServerMiddlewareInterceptOptions,
    {
      methodName,
      expressPath,
      httpRequestType,
    }: TaonAdditionalMiddlewareMethodInfo,
  ): Promise<void> | void {
    console.log(
      `Intercepting server method: ${methodName} as ${expressPath}`,
    );
    // async/await supported
    next();
  }

  /**
   * Similar to angular http interceptor (but axios based)
   */
  interceptClientMethod(
    { req, next }: TaonClientMiddlewareInterceptOptions,
    {
      methodName,
      expressPath,
      httpRequestType,
    }: TaonAdditionalMiddlewareMethodInfo,
  ): Observable<AxiosResponse<any>> {
    console.log(
      `Intercepting client method: ${methodName} at ${expressPath}`,
    );
    // user rxjs just like in angular http interceptor
    return next.handle(req).pipe(
      map(r => {
        console.log('data', r.data);
        r.data = `!!!${r.data}!!`;
        return r;
      }),
    );
  }
}
```
Example of using middlewares in controller and method:
```ts
@TaonController({
  className: 'SessionController',
  middlewares: ({ parentMiddlewares }) => ({
      ...parentMiddlewares,
      SessionMiddleware,
  }),
})
export class SessionController extends TaonBaseController {
  @PUT({
    middlewares: ({ parentMiddlewares }) => ({
      ...parentMiddlewares,
      AuthorizationMiddleware,
    }),
  })
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return 'hello world';
    };
    //#endregion
  }
}
```
