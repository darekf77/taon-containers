
### Taon repositories

Injectable (service like) classes for backend db communication
(similar to <https://typeorm.io/custom-repository>). 

You should use Repositories only inside server code.

```ts
@TaonRepository({
  className: 'UserRepository',
}) 
export class UserRepository extends TaonBaseRepository<User> {
  entityClassResolveFn = () => User;
  
  async findByEmail(email: string) {
    //#region @websqlFunc
    return this.repo.findOne({ where: { email } });
    //#endregion
  }
}
```
There is also a way to create custom repository without crud methods
```ts

@TaonRepository({ className: 'TaonBaseCustomRepository' })
export abstract class TaonBaseCustomRepository extends TaonBaseInjector {
  // your custom methods
}

```
