### Taon repositories

Taon repositories are injectable classes that encapsulate backend data access, similar to [TypeORM custom repositories](https://typeorm.io/custom-repository). Use repositories in backend code. Browser UI code accesses their functionality through Taon controller endpoints.

| Base class | When to use it |
| --- | --- |
| `TaonBaseRepository<Entity>` | Use it for a repository backed by a Taon entity, with built-in CRUD operations and optional custom queries. |
| `TaonBaseCustomRepository` | Use it for backend operations that need their own methods, such as calling an external service. |

#### Create an entity repository

Extend `TaonBaseRepository<User>` and set `entityClassResolveFn` to return the `User` entity class. Use `this.repo` to run TypeORM queries against that entity. In this example, `findByEmail()` looks up a user by email.

The `@websqlFunc` region is a Taon build directive that allows the method implementation to run in the WebSQL backend.

```ts
@TaonRepository({ className: 'UserRepository' })
export class UserRepository extends TaonBaseRepository<User> {
  entityClassResolveFn = () => User;

  async findByEmail(email: string) {
    //#region @websqlFunc
    return this.repo.findOne({ where: { email } });
    //#endregion
  }
}
```

#### Create a custom repository

Extend `TaonBaseCustomRepository` when your repository provides custom backend operations. This example delegates checkout URL creation to an application-specific Stripe integration. Implement `createCheckoutUrl` using your project's Stripe client and server-side configuration.

The `@backendFunc` region is a Taon build directive that keeps the method implementation on the server.

```ts
@TaonRepository({ className: 'TaonStripeApiRepository' })
export abstract class TaonStripeApiRepository extends TaonBaseCustomRepository {
  async getCheckoutUrl(): Promise<string> {
    //#region @backendFunc
    return this.createCheckoutUrl();
    //#endregion
  }

  protected abstract createCheckoutUrl(): Promise<string>;
}
```
