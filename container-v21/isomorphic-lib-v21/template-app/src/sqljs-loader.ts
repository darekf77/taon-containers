const basename = '<<<TO_REPLACE_BASENAME>>>';
const websqlMode = false;

export const loadSqlJs = async () => {
  if (websqlMode) {
    const localForge = (await import('localforage')).default;

    globalThis['localforage'] = localForge;

    const { default: initSqlJs } = await import('sql.js');
    // or if you are in a browser:
    // const initSqlJs = win.initSqlJs;

    const SQL = await initSqlJs({
      // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
      // You can omit locateFile completely when running in node

      locateFile: file => {
        const wasmPath = `${globalThis.location.origin}${basename}assets/${file}`;
        // console.log(`Trying to get sql.js wasm from: ${wasmPath}`)
        return wasmPath;
        // return `https://sql.js.org/dist/${file}`;
      },
    });

    globalThis['SQL'] = SQL;
    console.log('WEBSQL LOADED');
  } else {
    console.log('WEBSQL NOT LOADED');
  }
  // await Stor.awaitPendingOperatios();
};
