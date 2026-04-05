//#region imports
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloWorldApiService } from 'isomorphic-lib-v21/src';
//#endregion

@Component({
  selector: 'app-hello-world-simple',
  templateUrl: './hello-world-simple.component.html',
  styleUrls: ['./hello-world-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet],
  providers: [HelloWorldApiService],
})
export class HelloWorldSimpleComponent {
  helloWorldApiService = inject(HelloWorldApiService);
  readonly hello$ = this.helloWorldApiService.helloWorldMessage();
}
