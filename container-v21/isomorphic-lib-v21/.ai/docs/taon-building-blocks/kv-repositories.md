# Taon KV Repositories

Taon KV repositories provide typed key-value storage through injectable repositories. The API is inspired by key-value systems such as Redis and Cloudflare Workers KV, with a document-oriented approach to storing structured values similar to MongoDB. These comparisons describe the design inspiration. The examples below use Taon’s repository API.

Use a KV repository when you read or replace a value by a known key, such as application settings or a cached snapshot. Call the repository from backend code. Browser UI code should access the data through a Taon API endpoint.

## Define a repository

Extend `TaonBaseKvRepository` and declare the keys and value types in its type parameter. Decorate the class with `@TaonRepository`.

In this example, the `users` key stores a `User[]`. `setUsers()` replaces the array stored under that key, and `getUsers()` reads the array as a single value.

```ts
@TaonRepository({
  className: 'UserKvRepository',
})
export class UserKvRepository extends TaonBaseKvRepository<{
  users: User[];
}> {
  async setUsers(users: User[]): Promise<void> {
    //#region @websqlFunc
    await this.set('users', users);
    //#endregion
  }

  async getUsers(): Promise<User[]> {
    //#region @websqlFunc
    return await this.get('users');
    //#endregion
  }
}
```

The `@websqlFunc` region markers are Taon build directives. Keep them in the repository methods as shown.

## Inject the repository into a context

Add a field to your Taon context and initialize it with `injectKvRepository()`.

```ts
private readonly userKvRepository = this.inject(
  UserKvRepository,
);
```

## Choose the right storage model

Use a KV repository when callers usually work with the whole value under a known key. For example, `UserKvRepository` can store a snapshot of a user list. If callers need to look up individual users, filter by fields, or update records independently, use an entity repository for those operations.
