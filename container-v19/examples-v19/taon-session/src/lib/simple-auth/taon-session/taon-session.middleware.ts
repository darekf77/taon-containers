//#region imports
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import {
  Taon,
  TaonAdditionalMiddlewareMethodInfo,
  TaonClientMiddlewareInterceptOptions,
  TaonServerMiddlewareInterceptOptions,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonSessionProvier } from './taon-session.provider';
//#endregion

@Taon.Middleware({
  className: 'TaonSessionMiddleware',
})
export class TaonSessionMiddleware extends Taon.Base.Middleware {
  protected taonSessionProvier = this.injectProvider(TaonSessionProvier)
  interceptClientMethod(
    { req, next }: TaonClientMiddlewareInterceptOptions,
    {
      methodName,
      expressPath,
      httpRequestType,
    }: TaonAdditionalMiddlewareMethodInfo,
  ): Observable<AxiosResponse<any>> {
    return next.handle(req);
  }

  interceptServerMethod(
    { req, res, next }: TaonServerMiddlewareInterceptOptions,
    {
      methodName,
      expressPath,
      httpRequestType,
    }: TaonAdditionalMiddlewareMethodInfo,
  ): Promise<void> | void
  {}
}
