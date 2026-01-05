//#region imports
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../task.entity';
//#endregion

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaskComponent {
  readonly taskData = input.required<Task>();
  completed = output<Task>();
  deleted = output<Task>();

  toggleCompleted(): void {
    const task = this.taskData();
    this.completed.emit(task.clone({ ...task, completed: !task.completed }));
  }

  deleteTask(): void {
    this.deleted.emit(this.taskData());
  }
}
