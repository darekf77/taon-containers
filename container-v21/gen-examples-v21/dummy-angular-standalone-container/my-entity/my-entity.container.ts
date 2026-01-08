//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Container } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Container({
  selector: 'app-my-entity',
  templateUrl: './my-entity.container.html',
  styleUrls: ['./my-entity.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class MyEntityContainer {}