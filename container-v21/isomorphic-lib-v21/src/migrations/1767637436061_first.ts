import { Taon, TaonBaseMigration, TaonMigration } from 'taon/src';
import { QueryRunner } from 'taon-typeorm/src';
import { Task, TaskRepository } from 'isomorphic-lib-v21/src';

//#region Migration class for context "MainContext"
@TaonMigration({
  className: 'MainContext_1767637436061_first',
})
export class MainContext_1767637436061_first extends TaonBaseMigration {
  //#region is migration for context MainContext ready to run
  /**
   * IMPORTANT !!!
   * remove this method if you are ready to run this migration
   */
  public isReadyToRun(): boolean {
    return false;
  }
  //#endregion

  //#region up
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.startTransaction();
    try {
      // do "something" in db

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error in migration:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  //#endregion

  //#region down
  async down(queryRunner: QueryRunner): Promise<any> {
    // revert this "something" in db
    // await queryRunner.clearDatabase()
  }
  //#endregion
}
//#endregion

//#region Migration class for context "TaskContext"
@TaonMigration({
  className: 'TaskContext_1767637436061_first',
})
export class TaskContext_1767637436061_first extends TaonBaseMigration {
  taskRepository = this.injectRepo(TaskRepository);

  //#region up
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.startTransaction();
    try {
      // do "something" in db

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error in migration:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  //#endregion

  //#region down
  async down(queryRunner: QueryRunner): Promise<any> {
    // revert this "something" in db
    // await queryRunner.clearDatabase()
  }
  //#endregion
}
//#endregion

//#region Migration class for context "TodoMvcContext"
@TaonMigration({
  className: 'TodoMvcContext_1767637436061_first',
})
export class TodoMvcContext_1767637436061_first extends TaonBaseMigration {
  taskRepository = this.injectCustomRepository(TaskRepository);

  //#region up
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.startTransaction();
    try {
      await this.taskRepository.insert(
        new Task().clone({
          title: 'First Task from migration',
        }),
      );

      await this.taskRepository.insert(
        new Task().clone({
          title: 'Second Task from migration',
        }),
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error in migration:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  //#endregion

  //#region down
  async down(queryRunner: QueryRunner): Promise<any> {
    // revert this "something" in db
    await queryRunner.clearDatabase();
  }
  //#endregion
}
//#endregion
