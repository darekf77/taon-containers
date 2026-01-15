import './bootstrap';
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { ProjectNameApp, ProjectNameConfig } from './app/app';

const currentProjectGenericName = '<<<TO_REPLACE_CURRENT_PROJECT_GENERIC_NAME>>>';
globalThis['CURRENT_PROJECT_GENERIC_NAME'] = currentProjectGenericName;

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(ProjectNameApp, ProjectNameConfig, context);

export default bootstrap;
