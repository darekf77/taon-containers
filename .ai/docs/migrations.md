
# Taon migrations

Auto generated migration class files for
convenient CI/CD. Work with normal NodeJs backend and Websql browser backend.

Taon migration can be shipped with library code.

```ts
@TaonMigration({
  className: 'MainContext_1735315075962_firstMigration',
})
export class MainContext_1735315075962_firstMigration extends TaonBaseMigration {
  async up(queryRunner: QueryRunner): Promise<any> {
    // do "something" in db
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    // revert this "something" in db
  }
}
```

# Creating migrations
Use comamnd:
```bash
taon mc my-new-migration
```

This will create new migraion files inside /src/lib/migrations
