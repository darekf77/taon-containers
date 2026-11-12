# Taon framework building blocks

A Taon application is assembled from building blocks registered in a context. Controllers expose APIs, repositories handle backend data access, and Angular services connect the UI to those APIs and to context configuration.

Start with [Architecture](./architecture.md) if you need to locate the right project or understand its runtime targets. Start with [Contexts](./taon-building-blocks/contexts.md) if you are adding a feature to an existing project.

## Find the right building block

| If you need to… | Read |
| --- | --- |
| Register building blocks, compose reusable contexts, or initialize an application context | [Contexts](./taon-building-blocks/contexts.md) |
| Expose a REST endpoint, add entity CRUD, or return a structured API error | [Controllers](./taon-building-blocks/controllers.md) |
| Call a Taon controller from an Angular application | [API services](./taon-building-blocks/api-services.md) |
| Map a TypeScript class to a database table | [Entities](./taon-building-blocks/entities.md) |
| Query entities or encapsulate custom backend operations | [Repositories](./taon-building-blocks/repositories.md) |
| Store and retrieve typed values by key | [KV repositories](./taon-building-blocks/kv-repositories.md) |
| Define context-scoped configuration or resolve environment values | [Providers](./taon-building-blocks/providers.md) |
| Expose context configuration to Angular components | [Configuration services](./taon-building-blocks/config-services.md) |
| Intercept requests across a context, a controller, or an individual endpoint | [Middleware and interceptors](./taon-building-blocks/middlewares.md) |
| React to entity lifecycle events | [Subscribers](./taon-building-blocks/subscriber.md) |
| Evolve a database schema or understand how database modes affect existing data | [Migrations](./taon-building-blocks/migrations.md) |

## How the pieces fit together

For a feature such as listing users, an Angular component calls an API service. The service calls a Taon controller endpoint. The controller uses a repository to query the `User` entity and returns the result. The context registers the backend building blocks that the feature uses.

Configuration follows its own path. A provider holds context-scoped configuration, and an Angular configuration service exposes the values the UI needs. Middleware can intercept the API request, while subscribers react to entity events and migrations evolve the database over time.

## Related guides

- [Dependency injection](./dependency-injection.md) explains how to resolve classes from the appropriate context.
- [Isomorphic code regions](./isomorphic-code-regions.md) explains which code is included in browser and backend builds.
