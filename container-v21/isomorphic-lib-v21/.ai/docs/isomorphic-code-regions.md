# Isomorphic code regions

Taon builds shared TypeScript source for different runtimes. The CLI processes
the region markers below when it creates browser, WebSQL, CommonJS, or ESM
output. Put explanatory prose outside code examples; keep the exact region
markers in code because they are part of the build input.

## Backend code

Use `@backend` for a block that belongs to a backend build and can be omitted
from ordinary browser output. Use `@backendFunc` when a function body is
backend-only and the browser build must retain a function that returns
`undefined`.

```ts
function getNodeVersion(): string | undefined {
  //#region @backendFunc
  return process.version;
  //#endregion
}
```

`@websql` and `@websqlFunc` are for code that belongs to Node.js and WebSQL
backend builds. WebSQL mode runs backend logic in the browser; it is not the
same as an ordinary browser build.

```ts
function getBackendValue(): string | undefined {
  //#region @websqlFunc
  return 'backend-value';
  //#endregion
}
```

Use a shared fallback after a `@backend` region when the browser needs a
different implementation:

```ts
function getRuntimeName(): string {
  //#region @backend
  return process.release.name;
  //#endregion
  return 'browser';
}
```

## Browser-only and WebSQL-only code

Use `@browser` for code that should be emitted for the browser and omitted from
backend output. Imports can also use an inline marker at the end of the import
statement:

```ts
import { TaonAdminService } from 'taon/src'; // @browser
```

Use `@websqlOnly` for code that is specific to WebSQL browser mode and should
not be emitted for Node.js:

```ts
//#region @websqlOnly
const websqlOnlyValue = 'browser backend';
//#endregion
```

## CommonJS and ESM differences

`@esmRemove` marks code to remove from the ESM backend output, such as a
Node.js API that is unavailable in a Cloudflare Worker. `@cjsRemove` marks code
to remove from the CommonJS backend output.

```ts
function loadValue(): string {
  if (isCloudflareWorker()) {
    //#region @esmRemove
    return readFromNodeFilesystem();
    //#endregion
    return readFromWorkerBinding();
  }
  return readFromNodeFilesystem();
}
```

Cloudflare Workers use an ESM runtime and do not provide the full Node.js
runtime. Keep Worker bindings and APIs in the ESM-compatible path and test the
actual Worker artifact; a successful Node.js build does not verify Worker
compatibility.

## File suffixes and imports

Use `.browser.ts` for files intended only for browser-side code and
`.backend.ts` for Node.js-only code when the project's build recognizes those
suffixes. Angular component files are browser UI. Do not infer runtime support
from a generic `.service.ts` or `.routes.ts` name; inspect the target project's
build rules and examples.

Inline import annotations such as `// @browser` are build markers and must
remain at the end of the import statement. Do not place the marker above or
below the import. Avoid unmarked Node.js built-ins in shared files; use a
region or a runtime-neutral Taon API.

For available targets and transport differences, see
[Architecture](./architecture.md) and
[Transport layer](./transport-layer.md).
