import { bootstrapApplication } from '@angular/platform-browser';
import { ProjectNameAppConfig, ProjectNameApp } from './app/app';

let loadingPromise = new Promise<void>((resolve) => resolve());
//#region @websqlOnly
import { loadSqlJs } from './sqljs-loader';
loadingPromise = loadSqlJs();
//#endregion
loadingPromise.then(() => {
  bootstrapApplication(ProjectNameApp, ProjectNameAppConfig)
    .catch((err) => console.error(err));
});


