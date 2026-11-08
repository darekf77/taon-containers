# Backend

## IMPORTANT: isomorphic code

Never assume that a `.ts` file containing backend code is backend-only.

Taon source files are isomorphic and are transformed for different runtimes.

Before adding Node.js-only code, determine whether it needs:
- @websql / @websqlFunc
- @backend / @backendFunc
- @browser
- @websqlOnly
- @esmRemove

See `.ai/docs/isomorphic-code-regions-cutting.md`.

## Taon runtimes
Taon isomorphic backend is shared between multiple environemnts:
- **Normal** NodeJS server on TaonCloud 
(runtime with access to everything inculuding fs,child_process)
- **Cloudfalre** Workers NodeJS (limited esm node runtime)
- **Websql** mode (typeorm backend inside browser)
- **Electron** mode (similar to normal NodeJS mode)

## Wrapping function and methods

- for each new function (normal or class method)
wrap content of function in #region 

```ts
export namespace Utils {
  export const createBackendFile = () => {
    // #region @backendFunc
    
    /* Only NodeJS code shold be here  */


    // #endregion
  }
}

```
but if you think your code can run in websql mode 

```ts
export namespace Utils {
  export const createBackendFile = () => {
    // #region @websqlFunc
    
    /* This code will be visible to browser in websql mode */


    // #endregion
  }
}

```
