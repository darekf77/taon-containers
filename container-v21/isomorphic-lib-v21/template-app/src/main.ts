import './bootstrap';
import { bootstrapApplication } from '@angular/platform-browser';
import { ProjectNameAppConfig, ProjectNameApp } from './app/app';

const currentProjectGenericName = '<<<TO_REPLACE_CURRENT_PROJECT_GENERIC_NAME>>>';
globalThis['CURRENT_PROJECT_GENERIC_NAME'] = currentProjectGenericName;

let loadingPromise = new Promise<void>((resolve) => {
  console.log('WEBSQL skipping loading');
  resolve()
});
//#region @websqlOnly
import { loadSqlJs } from './sqljs-loader';
loadingPromise = loadSqlJs();
//#endregion
loadingPromise.then(() => {
  bootstrapApplication(ProjectNameApp, ProjectNameAppConfig)
    .catch((err) => console.error(err));
});


