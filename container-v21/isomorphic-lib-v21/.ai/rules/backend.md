# Backend

## Isomorphic source

Do not assume that a `.ts` file containing backend code is backend-only.
Taon transforms shared source for different runtimes. Isolate code that uses
runtime-specific APIs with the appropriate markers:

- `@backend` and `@backendFunc` for backend code.
- `@websql` and `@websqlFunc` for code included in Node.js and WebSQL builds.
- `@browser` for browser-only code.
- `@websqlOnly` for WebSQL-only code.
- `@esmRemove` and `@cjsRemove` for backend module-format differences.

See [Isomorphic code regions](../docs/isomorphic-code-regions.md) for marker
semantics and examples.

## Runtime differences

Taon supports these distinct backend targets:

- **Node.js** has access to Node.js APIs according to the app's environment
  and permissions.
- **Cloudflare Workers** use an ESM runtime with Worker APIs and do not provide
  the full Node.js runtime.
- **WebSQL** runs backend logic in the browser.
- **Electron** uses a main-process backend with privileged Node.js APIs.

Review [Transport layer](../docs/transport-layer.md) before relying on
networking, realtime communication, or platform APIs across targets.

## Runtime-specific functions

Wrap a function body in `@backendFunc` when it requires Node.js-only APIs.
The browser build keeps the function and returns `undefined`.

```ts
export namespace Utils {
  export const createBackendFile = () => {
    //#region @backendFunc
    /* ... */
    //#endregion
  };
}
```

Use `@websqlFunc` instead when the implementation should be included in both
Node.js and WebSQL builds.

```ts
export namespace Utils {
  export const createBackendFile = () => {
    //#region @websqlFunc
    /* ... */
    //#endregion
  };
}
```
