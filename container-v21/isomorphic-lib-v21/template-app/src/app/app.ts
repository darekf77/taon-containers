import { APP_INITIALIZER, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { Routes } from '@angular/router';

export const ProjectNameServerRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
export const routes: Routes = [];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton],
  template: `
    <h1>
      Hello world!
      <button mat-button>hello</button>
    </h1>
    <h1>Hello, {{ title() }}</h1>
  `,
  styles: `
    body {
      margin: 0px !important;
    }
  `
})
export class ProjectNameApp {
  protected readonly title = signal('app21');
}

export const ProjectNameAppConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => ProjectNameStartFunction,
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()), provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};

export const ProjectNameServerConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(ProjectNameServerRoutes))
  ]
};

export const ProjectNameConfig = mergeApplicationConfig(ProjectNameAppConfig, ProjectNameServerConfig);


const ProjectNameStartFunction = async (): Promise<void> => {


  //#region @browser
  console.log('Hello from the browser app initializer!');
  //#endregion

  //#region @backend
  console.log('Hello from the server app initializer!');
  //#endregion
}

export default ProjectNameStartFunction;
