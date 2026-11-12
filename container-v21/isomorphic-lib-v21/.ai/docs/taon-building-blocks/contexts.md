# Taon contexts

A context is Taon's registration and runtime boundary for framework building
blocks such as controllers, entities, repositories, providers, migrations, and
subcontexts. Register a class in the context that owns its behavior rather
than constructing it directly.

## Abstract and active contexts

An abstract context is reusable library configuration. An active context
combines reusable contexts with application-specific host configuration and
runtime settings. The CLI generates host configuration for deployable app
contexts; keep application-specific configuration in the application's
context.

```ts
import { Taon, TaonBaseContext } from 'taon/src';

export const MainAbstractContext = Taon.createContext(() => ({
  contextName: 'MainAbstractContext',
  abstract: true,
  contexts: {
    TaonBaseContext,
  },
}));
```

An active app context can include the abstract context and use its registered
building blocks:

```ts
export const AppContext = Taon.createContext(() => ({
  ...HOST_CONFIG['AppContext'],
  contexts: {
    MainAbstractContext,
  },
}));
```

Use `TaonBaseContext` where the application needs Taon's standard base
context. Add controllers, entities, repositories, providers, subscribers,
migrations, and database settings to the context configuration that owns
them. Keep class names and context names unique where Taon uses them for
registration or generated API paths.

## Initialization

Initialize each active context before using its APIs or resolving its
registered services. Abstract contexts are included by active contexts rather
than initialized as application entry points. Database and migration behavior
depends on the active context's configuration; see
[Migrations](./migrations.md).

## Related building blocks

- [Controllers](./controllers.md)
- [Repositories](./repositories.md)
- [Providers](./providers.md)
- [Entities](./entities.md)
- [Configuration services](./config-services.md)
