# Where environment variables are stored

Each Taon Project stores its environment variables — both secret and public — in:

```bash
/env.ts                         # Main root file with environment variables
/environments/**/env.*.ts      # Environment files for specific build artifacts/environments
```

## Example content of an `env.*.ts` file

```ts
import type { EnvOptions } from 'tnp/src';

const env: Partial<EnvOptions> = {
  website: {
    domain: 'example.domain.com',
    title: 'My Example Website',
    useDomain: true,
  },
  config: {
    /*
     * A string wrapped with TAON_ENCRYPTED_START and TAON_ENCRYPTED_END
     * means that the value is encrypted.
     *
     * You can decode it by running `taon env:decode` and providing
     * the correct master password.
     */
    secretApiKey: () =>
      `$$$TAON_ENCRYPTED_START$$asdasdasdasdasdasdBQ==$$$TAON_ENCRYPTED_END$$$`,

    publicKey: 'ANY_PUBLIC_KEY',
  },
};

export default env;
```

# Starting an environment configuration from scratch

You can initially define your environment file with a plain-text secret:

```ts
import type { EnvOptions } from 'tnp/src';

const env: Partial<EnvOptions> = {
  website: {
    domain: 'example.domain.com',
    title: 'My Example Website',
    useDomain: true,
  },
  config: {
    /*
     * Use `taon env:encode` with a master password of your choice
     * to encrypt this value.
     *
     * After encryption, the value will be wrapped with
     * TAON_ENCRYPTED_START and TAON_ENCRYPTED_END markers.
     */
    secretApiKey: () =>
      `my secret api key that should NOT be committed to the repository in decoded form!`,

    publicKey: 'ANY_PUBLIC_KEY',
  },
};

export default env;
```

> **Important:** Do not commit the file while secret values are still stored in plain text. Run `taon env:encode` first.

# How to access environment variables

Use the generated environment variables from:

```bash
/src/lib/env/**
```

## Secret variables

Secret variables are generated as functions returning promises and must be awaited:

```ts
// DO NOT USE THESE VARIABLES ON THE FRONTEND!
export const ENV_ANGULAR_NODE_APP_CONFIG_SECRET_API_KEY =
  (): Promise<string> => decodeEnv('MY_SECRET_API_KEY');
// DO NOT USE THESE VARIABLES ON THE FRONTEND!
```

## Public variables

Public variables are usually regular strings, numbers, or booleans:

```ts
// SAFE TO USE ON BOTH FRONTEND AND BACKEND
export const ENV_ANGULAR_NODE_APP_CONFIG_PUBLIC_KEY = 'ANY_PUBLIC_KEY';
```

# Preferred way of using environment variables

## 1. Create a provider

Use a provider as the central place where generated environment variables are resolved and assigned.

```ts
@TaonProvider({
  className: 'MyEntityProvider',
})
export class MyEntityProvider extends TaonBaseProvider {
  declare SECRET_API_KEY: string;
  declare PUBLIC_KEY: string;

  async _() {
    // Assign environment variables in one place.
    this.PUBLIC_KEY = ENV_ANGULAR_NODE_APP_CONFIG_PUBLIC_KEY;

    //#region @backend
    this.SECRET_API_KEY =
      await ENV_ANGULAR_NODE_APP_CONFIG_SECRET_API_KEY();
    //#endregion

    /*
     * This method is executed during context initialization,
     * so it is the preferred place to resolve and assign
     * environment variables.
     */
  }
}
```

## 2. Inject the provider into controllers, repositories, etc.

**This is the preferred way to access environment variables on the backend: inject the provider.**

```ts
@TaonProvider({
  className: 'MyEntityRepository',
})
export class MyEntityRepository extends TaonBaseRepostory {
  protected myEntityProvider = this.injectProvider(MyEntityProvider);

  @GET()
  getSecret(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      return requestToExternalApi({
        secret: this.myEntityProvider.SECRET_API_KEY,
      });
    };
    //#endregion
  }
}
```

## 3. Create `config.service.ts` to access public variables on the frontend

**This is the preferred way to access public environment variables on the frontend: inject a config service.**

```ts
import { inject, Injectable } from '@angular/core';
import { TaonBaseAngularService } from 'taon/src';

@Injectable()
export class MyEntityConfigService extends TaonBaseAngularService {
  protected myEntityProvider = this.injectProvider(MyEntityProvider);

  requestWithPublicKey() {
    fetchSomething({
      publicKey: this.myEntityProvider.PUBLIC_KEY,
    });
  }
}

@Component({
  selector: 'my-example-component',
  // ...
})
export class MyExampleComponent {
  myEntityConfigService = inject(MyEntityConfigService);

  ngOnInit() {
    this.myEntityConfigService.requestWithPublicKey();
  }
}
```

# What NOT to do

1. **Do not run `taon env:decode` before starting a Taon build**, such as:

   ```bash
   taon build:watch:lib
   taon app
   ```

   You will be asked for the **master password** when necessary.

   During the build, Taon automatically creates a decoded copy of:

   ```bash
   /env.ts
   /environments/**
   ```

   inside the `tmp-env` folder.

2. **Do not worry if an encrypted value looks different after running `taon env:decode` or another environment operation.**

   For example:

   ```text
   $$$TAON_ENCRYPTED_START$$...$$$TAON_ENCRYPTED_END$$$
   ```

   The encrypted representation may change. This is normal. The encryption mechanism can rotate the encrypted representation while the **master password remains the same**.

3. **Never commit unencrypted secret variables.**

   Do NOT commit:

   ```ts
   // UNSAFE — DO NOT COMMIT
   mySecretApiKey: () => `my-secret-api`,
   ```

   Always use:

   ```bash
   taon env:encode
   ```

   before committing files containing secrets.

   Secret values inside `/env.ts` and `/environments/**` should be encrypted:

   ```ts
   // SAFE TO COMMIT
   mySecretApiKey: () =>
     `$$$TAON_ENCRYPTED_START$$euhauidhaisre$$$TAON_ENCRYPTED_END$$$`,
   ```

# Additional rules for AI agents

When working with Taon environment variables, an AI agent must:

- Use only generated environment variables from:

  ```bash
  /src/lib/env/**
  ```

- Never attempt to encrypt or decrypt environment variables.
- Never run:

  ```bash
  taon env:decode
  ```

- Never run:

  ```bash
  taon env:encode
  ```

- Never access or expose the master password.
- Never replace generated environment variables with hardcoded secret values.

# How to generate a master password

Use:

```bash
taon env:gen:pass
```

Alternatively, use the interactive environment menu:

```bash
taon env
```

# How the master password is preserved locally

- The master password is securely preserved by the Taon worker for **1 day**.
- The Taon CLI preserves the password only after verifying that it is correct.
- You can remove the preserved master password from the worker at any time.

# How to remove the master password from the worker

Use:

```bash
taon env:rm:pass
```

Alternatively, use the interactive environment menu:

```bash
taon env
```
