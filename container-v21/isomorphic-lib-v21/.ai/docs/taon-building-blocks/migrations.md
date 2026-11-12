# Taon Migrations

Taon generates migration class files that you can version alongside your application and run in CI/CD. Migrations work with both the Node.js backend and the WebSQL browser backend.

## Terminal UI menu

To easy create, rever or run migrations, Taon has interactive terminal ui.

```bash
taon migration
```


## Create a migration

Start the application once so the CLI detects and initializes its active
contexts, then stop it and run this command from the Taon project root. The
short alias is also accepted:

```bash
taon migration:create my-new-migration
taon mc my-new-migration
```

Taon generates a migration class for each detected context in
`./src/lib/migrations`. Generated classes initially return `false` from
`isReadyToRun()`; enable a class only after its `up()` and `down()` methods are
complete and reviewed.


## Reverting a migration

Use timestamp from migration class name follow terminal menu instructions

```bash
taon migration:revert 1794523651172 
```

## Write a migration

Use TypeORM’s `QueryRunner` API for schema changes such as creating tables and adding columns. Use raw SQL only when the TypeORM API cannot express the operation.

Implement the change in `up()` and reverse it in `down()`. Use `this.inject()`
if the migration needs a Taon repository. The CLI's generated `up()` template
starts a transaction and commits or rolls it back; preserve that behavior when
editing the generated file.

```ts
@TaonMigration({
  className: 'MainContext_1735315075962_firstMigration',
})
export class MainContext_1735315075962_firstMigration extends TaonBaseMigration {
  anyTaonRepository = this.inject(AnyTaonRepository);

  async up(queryRunner: QueryRunner): Promise<void> {
    /* ... */
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    /* ... */
  }
}
```

## How context database modes affect data

| Context database mode | Normal mode (Node.js) | WebSQL mode (browser) |
| --- | --- | --- |
| `DROP_DB__RUN_MIGRATIONS` | Drops and recreates the database and all entity tables. Existing data is deleted. Taon skips migrations and saves the default entities. | Drops and recreates the database and all entity tables on every page reload. Existing data is deleted. Taon skips migrations and saves the default entities. |
| `PRESERVE_DATA__RUN_MIGRATIONS` | Preserves existing data, runs pending migrations, and saves the default entities. | Preserves data across page reloads and saves the default entities. The first time you switch to this mode, Taon marks all existing migrations as completed without executing them. Subsequent runs execute pending migrations. |

### DBRecreateMode enum
 DBRecreateMode can be found in '**taon/src**' package
```ts
export enum DBRecreateMode {
  DROP_DB__RUN_MIGRATIONS = 'DROP_DB__RUN_MIGRATIONS',
  PRESERVE_DATA__RUN_MIGRATIONS = 'PRESERVE_DATA__RUN_MIGRATIONS',
}
```

## Share migrations across projects

You can share migration classes between Taon applications and libraries the same way you share other Taon framework classes.


## Raw Migartions

Since *DROP_DB__RUN_MIGRATIONS* is default for development mode, use '**@taon-dev/sudo**' raw migration backoffice to create/restore/export data snapshoots
