//#region imports
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  Task,
  TaskApiService,
  TasksListComponent,
} from 'isomorphic-lib-v21/src';
import { Observable } from 'rxjs';
//#endregion

@Component({
  selector: 'app-todo-mvc',
  templateUrl: './todo-mvc.component.html',
  styleUrls: ['./todo-mvc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, TasksListComponent, MatCardModule],
  providers: [TaskApiService],
})
export class TodoMvcComponent {
  taskApiService = inject(TaskApiService);

  readonly tasks: Observable<Task[]> = this.taskApiService.allMyEntities$;

  async onTaskCompleted(event: Task): Promise<void> {
    await this.taskApiService.updateTask(event);
    this.taskApiService.refreshList.next();
  }

  async onTaskDeleted(event: Task): Promise<void> {
    await this.taskApiService.deleteTask(event);
    this.taskApiService.refreshList.next();
  }

  async onTaskAdded(event: Task): Promise<void> {
    await this.taskApiService.createTask(event);
    this.taskApiService.refreshList.next();
  }
}
