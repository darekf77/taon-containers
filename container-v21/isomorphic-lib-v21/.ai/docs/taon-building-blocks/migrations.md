# Taon Migrations

Taon provides a database migration system built on top of **TypeORM**, supporting both traditional **Node.js backends** and **WebSQL browser backends** .

Migration classes are generated automatically, can be shared between Taon projects, and can be versioned in Git alongside application code.

Migrations can be executed locally or integrated into CI/CD workflows to keep database schemas synchronized with application changes.

## 1. Migration Workflow

The typical migration workflow is:

```text
                  DATABASE SCHEMA CHANGE
                            │
                            ▼
                    CREATE MIGRATION
                            │
                            ▼
                    IMPLEMENT up()
                    IMPLEMENT down()
                            │
                            ▼
                     REVIEW & ENABLE
                            │
                            ▼
                     RUN MIGRATIONS
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
          NODE.JS BACKEND          WEBSQL BACKEND
                │                       │
                ▼                       ▼
           SQL DATABASE          BROWSER DATABASE
```

Taon manages migration discovery and execution through its context system.

Each migration belongs to a specific Taon context, allowing applications with multiple contexts to manage their database changes independently.

## 2. Interactive Migration Menu

The easiest way to manage migrations is through Taon's interactive terminal interface.

```bash
taon migration
```

Short alias:

```bash
taon m
```

The terminal menu provides access to migration operations such as creating, running, and reverting migrations.

You can also execute these operations directly using CLI commands.

## 3. Creating Migrations

Before generating migrations, start the application at least once so Taon can detect and initialize its active contexts.

Then stop the application and execute the command from the Taon project root.

```bash
taon migration:create my-new-migration
```

Short alias:

```bash
taon mc my-new-migration
```

Taon generates migration classes for all detected contexts in:

```text
src/lib/migrations/
```

### Example Generated Structure

```text
src/
└── lib/
    └── migrations/
        ├── MainContext_1735315075962_firstMigration.ts
        ├── AdminContext_1735315075962_firstMigration.ts
        └── ReportingContext_1735315075962_firstMigration.ts
```

Each generated migration is associated with its corresponding **active** context.

### Migration Safety

Newly generated migrations are disabled by default.

```ts
isReadyToRun(): boolean {
  return false;
}
```

After implementing and reviewing the migration, enable it:

```ts
isReadyToRun(): boolean {
  return true;
}
```

This prevents incomplete migration classes from being executed accidentally.

## 4. Writing Migrations

Taon migrations extend `TaonBaseMigration` and use TypeORM's `QueryRunner` API.

Each migration implements two methods:

- `up()` — applies the database changes.
- `down()` — reverses the changes when the migration is reverted.

Use TypeORM's `QueryRunner` methods for schema operations such as creating tables, adding columns, and modifying indexes.

Raw SQL can be used when the TypeORM API does not support a required operation.

### Example Migration

```ts
@TaonMigration({
  className: 'MainContext_1735315075962_firstMigration',
})
export class MainContext_1735315075962_firstMigration extends TaonBaseMigration {
  anyTaonRepository = this.inject(AnyTaonRepository);

  isReadyToRun(): boolean {
    return true;
  }

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'displayName',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'displayName');
  }
}
```

### Injecting Taon Repositories

Migrations can access Taon repositories using `this.inject()`.

```ts
userRepository = this.inject(UserRepository);
```

This can be useful for data transformations requiring application-level logic.

For schema changes, prefer working directly with `QueryRunner` to keep the migration explicit and predictable.

### Transactions

Generated migration templates include transaction handling.

Preserve the generated transaction behavior when modifying migration code:

```text
BEGIN TRANSACTION
        │
        ▼
   EXECUTE up()
        │
    ┌───┴───┐
    │       │
 SUCCESS   ERROR
    │       │
    ▼       ▼
 COMMIT   ROLLBACK
```

Database engines may differ in their support for transactional schema changes. Always test migrations against the target database.

## 5. Running Migrations
(Usually you don't need to do that since `taon release` command includes migration run for every new release/deploy )

Execute pending migrations across all detected contexts:

```bash
taon migration:run
```

Short alias:

```bash
taon mr
```

Unlike starting the full application, this command initializes the necessary application contexts, executes migrations, and then exits.


## 6. Reverting Migrations

Taon supports reverting migrations using their timestamps.

For example, given the migration:

```text
MainContext_1735315075962_firstMigration
```

Use the timestamp:

```bash
taon migration:revert 1735315075962
```

The terminal menu can also guide you through the revert process.

A migration's `down()` method defines how its changes are reversed.

**Important:** Reverting schema changes may cause data loss, particularly when dropping columns or tables. Always review the migration and back up important data before reverting production databases.

## 7. Database Recreation Modes

Taon contexts support different database initialization strategies through `DBRecreateMode`.

The selected mode determines whether existing database data is preserved or recreated.

### Available Modes

```ts
export enum DBRecreateMode {
  DROP_DB__RUN_MIGRATIONS = 'DROP_DB__RUN_MIGRATIONS',
  PRESERVE_DATA__RUN_MIGRATIONS = 'PRESERVE_DATA__RUN_MIGRATIONS',
}
```
(**Websql mode**) by default run DROP_DB__RUN_MIGRATIONS and 
you can change it to PRESERVE_DATA__RUN_MIGRATIONS inside '@taon-dev/sudo'  package backoffice.

The enum is available from the `taon/src` package.

### Behavior Comparison

| Database mode | Node.js backend | WebSQL browser backend |
|---|---|---|
| `DROP_DB__RUN_MIGRATIONS` | Drops and recreates the database and entity tables, then saves default entities. Existing data is deleted and migrations are skipped. | Recreates the database and entity tables on every page reload, deleting existing data. Migrations are skipped and default entities are saved. |
| `PRESERVE_DATA__RUN_MIGRATIONS` | Preserves existing data, runs pending migrations, and saves default entities. | Preserves data across reloads and saves default entities. On the first switch to this mode, existing migrations are marked as completed without execution; subsequent runs execute pending migrations. |

### Development Mode — Recreate Database

`DROP_DB__RUN_MIGRATIONS` is the default development mode.

It is useful when:

- Working on early database schemas.
- Testing entities without preserving existing data.
- Frequently changing database structures.
- Recreating a clean development environment.

However, **this mode deletes existing database data**.

Despite the mode's name, migrations are skipped during database recreation.

### Persistent Mode — Preserve Data

`PRESERVE_DATA__RUN_MIGRATIONS` keeps existing database data and applies pending migrations.

This mode is appropriate when database contents must survive application restarts or page reloads.

It is particularly important for production applications and persistent WebSQL environments.

## 8. Sharing Migrations Between Projects

Taon migrations can be shared between standalone projects and container projects, just like other Taon framework classes.

This is particularly useful for reusable application libraries that provide their own database entities and repositories.

For example:

```text
                  COMPANY CONTAINER
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
       AUTH APP-LIB             CUSTOMER APP-LIB
             │                       │
       Auth Entities           Customer Entities
       Auth Repositories       Customer Repositories
       Auth Migrations         Customer Migrations
             │                       │
             └───────────┬───────────┘
                         │
                         ▼
                  MAIN APPLICATION
                         │
                         ▼
                  TAON CONTEXTS
                         │
                         ▼
                    DATABASES
```

This allows database schema changes to remain close to the functionality that depends on them.

Shared migration classes should be managed carefully to avoid duplicate registration or conflicting execution across contexts.

## 9. Raw Migrations and Database Snapshots

Schema migrations are not always the best solution for restoring large amounts of development data.

Since `DROP_DB__RUN_MIGRATIONS` recreates the database by default in development mode, developers may need a convenient way to save and restore database contents.

Taon provides raw migration and data snapshot functionality through:

**`@taon-dev/sudo`**

The Sudo backoffice can be used to create, export, and restore database snapshots.

### Schema Migrations vs. Raw Data Snapshots

| Feature | Schema migrations | Raw migrations / snapshots |
|---|---|---|
| Main purpose | Evolve database structure | Save and restore database contents |
| Implementation | TypeORM migration classes | Sudo backoffice |
| Version control | Migration source files | Exported snapshot files |
| Typical use | Production schema evolution | Development data restoration |
| Reversible | Through `down()` when implemented | Through restoring a suitable snapshot |

### Example Development Workflow

```text
                  DEVELOPMENT DATABASE
                           │
                           ▼
                  EXPORT DATA SNAPSHOT
                           │
                           ▼
                    MODIFY ENTITIES
                           │
                           ▼
                  RECREATE DATABASE
                           │
                           ▼
                  RESTORE DATA SNAPSHOT
                           │
                           ▼
                   CONTINUE DEVELOPMENT
```

This is useful for preserving representative development data while working with frequently changing entity definitions.

Snapshots should be compatible with the target schema. Restoring data into a changed database structure may require transformation or additional validation.

## 10. CLI Command Reference

| Command | Alias | Description |
|---|---|---|
| `taon migration` | `taon m` | Open the interactive migration menu |
| `taon migration:create` | `taon mc` | Generate migration classes for detected contexts |
| `taon migration:run` | `taon mr` | Run pending migrations and exit |
| `taon migration:revert <timestamp>` | — | Revert migration changes using a timestamp |

### Create

```bash
taon migration:create my-new-migration
taon mc my-new-migration
```

### Run

```bash
taon migration:run
taon mr
```

### Revert

```bash
taon migration:revert 1794523651172
```

### Interactive Menu

```bash
taon migration
taon m
```

## 11. Recommended Practices

1. **Keep migrations in version control.** Migration history should evolve alongside application code.

2. **Review generated migrations before enabling them.** Generated classes start with `isReadyToRun()` returning `false` for a reason.

3. **Implement both `up()` and `down()`.** Reversible migrations make development and recovery easier, although some data changes cannot be fully reversed.

4. **Prefer TypeORM's `QueryRunner` API.** Use raw SQL when necessary and account for database-specific behavior.

5. **Test migrations in both Node.js and WebSQL when targeting both runtimes.** Shared migration classes do not guarantee identical database engine behavior.

6. **Use persistent database mode when data matters.** Avoid destructive database recreation outside disposable development environments.

7. **Use Sudo snapshots for development data.** Schema migrations and database snapshots solve different problems.

8. **Integrate migrations into release workflows.** Validate database changes before deploying application code that depends on them.

---

## Summary

Taon migrations provide a unified way to manage database evolution across Node.js and browser-based WebSQL applications.

The migration system integrates with Taon's context architecture, supports reusable migration classes, and can participate in automated build and deployment workflows.

**One migration architecture. Multiple execution environments. Consistent database evolution.**
