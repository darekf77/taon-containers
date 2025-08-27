//#region imports
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { TaonAdditionalMiddlewareMethodInfo } from 'taon/src';
import {
  TaonClientMiddlewareInterceptOptions,
  TaonServerMiddlewareInterceptOptions,
} from 'taon/src';
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@Taon.Middleware({
  className: 'SessionMiddleware',
})
export class SessionMiddleware extends Taon.Base.Middleware {
  name = 'SessionMiddleware';
  interceptServer = void 0;
  // interceptServer({ req, res, next, }: TaonServerMiddlewareInterceptOptions): Promise<void> | void {
  //   console.log('SessionMiddleware intercepting server request', req?.url);
  //   next();
  // }

  interceptClient = void 0;
  // interceptClient({
  //   req,
  //   next,
  // }: TaonClientMiddlewareInterceptOptions): Observable<AxiosResponse<any>> {
  //   console.log('SessionMiddleware intercepting client request', req?.url);
  //   return next.handle(req);
  // }

  interceptServerMethod(
    { req, res, next }: TaonServerMiddlewareInterceptOptions,
    {
      methodName,
      expressPath,
      httpRequestType,
    }: TaonAdditionalMiddlewareMethodInfo,
  ): Promise<void> | void {
    console.log(
      `[${this.name}][${httpRequestType}] Intercepting server method: ${methodName} as ${expressPath}`,
    );
    next();
  }

  interceptClientMethod(
    { req, next }: TaonClientMiddlewareInterceptOptions,
    {
      methodName,
      expressPath,
      httpRequestType,
    }: TaonAdditionalMiddlewareMethodInfo,
  ): Observable<AxiosResponse<any>> {
    console.log(
      `[${this.name}][${httpRequestType}] Intercepting client method: ${methodName} at ${expressPath}`,
    );
    return next.handle(req).pipe(
      map(r => {
        console.log('data', r.data);
        r.data = `!!!${r.data}!!`;
        return r;
      }),
    );
  }
}
