
### Taon controller

Injectable to angular's api service -
glue/bridge between backend and frontend.

- ONLY INJECT controlelrs inside *.api.services.ts.

```ts
@TaonController({ className: 'UserController' })
class UserController extends TaonBaseCrudController<User> {
   // This crud controllers there are methods like getAll(), update() etc.
   // Crud controller structure is similar to taon repository for entity 
   // structure.

   @GET()
    helloWorld(): Taon.Response<string> {
      //#region @websqlFunc
      return async (req, res) => 'hello world';
      //#endregion
    }
}
```

and crud controller with automatically generated REST API:

```ts
@TaonController({ className: 'UserController' })
class UserController extends TaonBaseCrudController<User> {
  entityClassResolveFn = () => User; // crud controller for quick entity rest api

  @GET() // acessible on in browser code
  whatTimeIsIt(): Taon.Response<string> {
    return async () => {
      return new Date().toString();
    };
  }
}
```


## Error handling inside controllers
```ts
@TaonController({
  className: 'SampleController'
})
export class SampleController extends TaonBaseController {
  @GET()
  helloWorld(
    @Query('errorType')
    errorType?: 'short' | 'stack' | 'customCode' | 'taonError',
  ): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {

       // 3. (RECOMMENDED) Method -> Taon way of custom errors 
      if (errorType === 'taonError') {
        Taon.error({
          message: 'This is custom Taon error',
          code: "CUSTOM_ERR", // optional
          status: 499,
        });
        // 'return' function not needed here, error throws automatically
      }      

      // 1. (ALLOWED) Method -> Clean & simple error message
      if (errorType === 'short') {
        throw 'short error message here';
      }

      // 2. (ALLOWED) Method -> Error message with stack trace
      if (errorType === 'stack') {
        throw new Error('message with stack trace here');
      }     

      // (NOT RECOMMENDED) ExpressJS way of custom errors
      if (errorType === 'customCode') {
        res.status(444).json({
            customErrorMessage: 'Helo my friend'
        });
        return; // NEEDED for this method
      }

      
      return `hello world`;
    };
    //#endregion
  }
```
