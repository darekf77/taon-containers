# Taon entities

A Taon entity is a TypeScript class that maps to a database table. Taon builds on [TypeORM entities](https://typeorm.io/entities). You can also use an entity class as a data transfer object (DTO) when its fields match the API contract. Define a separate DTO when an endpoint accepts or exposes only part of the entity.

## Define an entity

Decorate the class with `@TaonEntity` and set `className` to the class name. Use Taon column decorators to define persisted fields.

In this example, `@StringColumn()` maps `location` to a database column. The `@websql` region markers are Taon build directives. Keep them around the column decorator as shown.

```ts
@TaonEntity({ className: 'Project' })
export class Project extends TaonBaseEntity {
  //#region @websql
  @StringColumn()
  //#endregion
  location?: string;
}
```

The `?` makes `location` optional in TypeScript. Configure database nullability and defaults through the column definition.

## Use the base entity with ID and version fields

Extend `TaonBaseAbstractEntity` when you want Taon to provide `id` and `version` fields. Declare the fields specific to your entity in the subclass.

```ts
@TaonEntity({ className: 'User' })
export class User extends TaonBaseAbstractEntity {
  //#region @websql
  @StringColumn()
  //#endregion
  name?: string;
}
```

## Inject an entity repository

Use `this.injectRepo()` in your Taon context to get the repository for an entity. Pass the entity class so Taon can resolve the corresponding repository.

```ts
private readonly userRepository = this.injectRepo(User);
```

## Keep entities compatible with SQLite

Shared entity definitions must work with SQLite-backed Taon runtimes, including browser WebSQL mode. Follow the column decorators and mappings already used by the project.

- Prefer Taon column decorators, such as `@StringColumn()`, for common field types.
- Avoid declaring raw `int` column types in shared entities. For whole numbers, use the project's SQLite-compatible integer column mapping.
- Avoid database-specific column types such as PostgreSQL `jsonb`, native enums, and array columns in shared entities. Use a representation supported by each target runtime.
- Keep column defaults, indexes, and constraints portable. Verify that any database expression used by the entity works on each target.
- When changing the schema of an existing entity, check the corresponding migration against the same runtimes as the entity.
