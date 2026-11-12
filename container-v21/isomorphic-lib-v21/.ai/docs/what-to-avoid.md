# What to avoid

## Finish migration transactions correctly

let say we have migration started:
```ts
await queryRunner.startTransaction();
```
to end transaction:
```ts
await queryRunner.release();  // IT IS NOT ENOUGH
                        // and this may cause weird errors

// proper 'end' of transaction
await queryRunner.commitTransaction();
await queryRunner.release();
```


## Use **CURRENT_TIMESTAMP** instead **NOW()**

SQlite does not support **NOW()**


## Use **integer** instead **int**

SQlite does not support **int**

