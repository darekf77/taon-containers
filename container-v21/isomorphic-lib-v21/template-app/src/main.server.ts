import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { ProjectNameApp, ProjectNameConfig } from './app/app';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(ProjectNameApp, ProjectNameConfig, context);

export default bootstrap;
