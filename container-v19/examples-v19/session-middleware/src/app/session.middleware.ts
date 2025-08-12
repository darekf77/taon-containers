//#region imports
import { TaonMiddlewareInterceptOptions } from 'taon/src';
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@Taon.Middleware({
  className: 'SessionMiddleware',
})
export class SessionMiddleware extends Taon.Base.Middleware {
  async intercept({ server, client }: TaonMiddlewareInterceptOptions): Promise<void> {
    if (client) {
      //#region @browser
      console.log(
        'SessionMiddleware intercepting client request',
        client?.req?.url,
      );
      //#endregions
    }
    if (server) {
      //#region @websql
      console.log(
        'SessionMiddleware intercepting server request',
        server?.req?.url,
      );
      //#endregion
    }
  }
}
