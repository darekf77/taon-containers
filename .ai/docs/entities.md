
# Taon entities

Entity class that can be use as Dto. Based no typeorm entites https://typeorm.io/entities

```ts
@TaonEntity({ className: 'User' })
class User extends TaonBaseAbstractEntity { // with id, version included
  //#region @websql
  @StringColumn()
  //#endregion
  name?: string;
}
```


```ts
@TaonEntity({ className: 'Project' })
class Project extends TaonBaseEntity {
  //#region @websql
  @StringColumn()
  //#endregion
  location?: string;
}
```
