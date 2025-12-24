import { bootstrapApplication } from '@angular/platform-browser';
import { ProjectNameAppConfig, ProjectNameApp } from './app/app';

bootstrapApplication(ProjectNameApp, ProjectNameAppConfig)
  .catch((err) => console.error(err));
