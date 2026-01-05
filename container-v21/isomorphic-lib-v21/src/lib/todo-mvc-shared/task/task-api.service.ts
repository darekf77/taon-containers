import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { Task } from './task.entity';
import { TaskController } from './task.controller';

@Injectable()
export class TaskApiService extends TaonBaseAngularService {
  protected taskController = this.injectController(TaskController);

  public refreshList = new BehaviorSubject<void>(undefined);

  public get allMyEntities$(): Observable<Task[]> {
    return this.refreshList.pipe(
      switchMap(() =>
        this.taskController.getAll().request!().observable.pipe(
          map(res => res.body.json),
        ),
      ),
    );
  }

  async updateTask(task: Task): Promise<Task> {
    return await this.taskController
      .updateById(task.id, task)
      .request()!
      .then(res => res.body.json);
  }

  async createTask(task: Task): Promise<Task> {
    return await this.taskController
      .save(task)
      .request()!
      .then(res => res.body.json);
  }

  async deleteTask(task: Task): Promise<void> {
    await this.taskController.deleteById(task.id).request()!;
  }
}
