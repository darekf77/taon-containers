# Taon KV repositories

Injectable classes for key value database (redis like)

```ts
// how to inject
private readonly userKvRepository = this.injectKvRepository(
    UserKvRepository,
  );
```


You should use KvRepositories only inside server code.

```ts
@TaonRepository({
  className: 'UserKvRepository',
}) 
export class UserKvRepository extends TaonBaseKvRepository<{
  users: User[]
}> {
  
  
  async setUsers(users:User[]) {
    //#region @websqlFunc
    await this.set('users',users);
    //#endregion
  }

  async getUsers():Promise<User[]> {
    //#region @websqlFunc
    return await this.get('users');
    //#endregion
  }
}

