//#region imports
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Input,
  output,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../task.entity';
import { TaskComponent } from 'isomorphic-lib-v21/src';
//#endregion

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TaskComponent],
})
export class TasksListComponent {
  readonly tasks = input.required<Task[]>();
  readonly newTitle = signal('');

  submitNewTask(): void {
    const title = this.newTitle().trim();

    if (!title) {
      return;
    }
    this.newTitle.set('');
    this.add.emit(
      new Task().clone({
        title,
      }),
    );
  }

  add = output<Task>();

  completed = output<Task>();
  deleted = output<Task>();
}
