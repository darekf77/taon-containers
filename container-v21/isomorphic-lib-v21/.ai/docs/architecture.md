# Taon architecture

Taon is a TypeScript framework and CLI for building applications and reusable libraries. A standalone Taon project keeps its source in one `src/` tree. The CLI uses that source to build the library or application artifacts configured for the project.

Taon workspaces can contain several projects. Each project has a root `taon.jsonc` that identifies its type and defines its project-specific configuration.

## Identify a Taon project

Open `taon.jsonc` in the directory you are inspecting. Its `type` field tells you how to navigate the project.

| `type` | Project kind | Where to look next |
| --- | --- | --- |
| `isomorphic-lib` | Standalone project | Open `src/` for the application and library source. |
| `container` | Container project | Look for child directories with their own `taon.jsonc`. |

The snippets below show only the field that identifies the project type. An existing `taon.jsonc` can contain additional settings.

### Standalone projects

A standalone project declares `isomorphic-lib` in its root `taon.jsonc`.

```jsonc
{
  "type": "isomorphic-lib"
}
```

A standalone project owns its `src/` tree. It can expose reusable code through its library entry point and use the same code in its application entry points. For example, a project can export a context and its building blocks for other Taon projects to use, while also providing an application that runs them.

A standalone project can live on its own or inside a Taon container. It may have its own Git repository. The `type` field describes the Taon project structure. Check the Git root separately when working across projects.

```text
my-feature/
  taon.jsonc
  src/
    lib/
      index.ts
    app.ts
```

### Container projects

A container declares `container` in its root `taon.jsonc`.

```jsonc
{
  "type": "container"
}
```

A container groups standalone projects and can also contain nested containers. Each child project has its own root configuration. A workspace can therefore contain reusable libraries, consuming applications, and groups of related projects at different levels.

```text
workspace/
  taon.jsonc
  shared-feature/
    taon.jsonc
    src/
  applications/
    taon.jsonc
    website/
      taon.jsonc
      src/
```

In this layout, `workspace/` and `applications/` are containers. `shared-feature/` and `website/` are standalone projects. If `website/` consumes a feature exported by `shared-feature/`, follow the import to find the implementation. Reusable behavior belongs in the project that provides it. Website-specific configuration and integration belong in `website/`.

### Navigate a workspace

1. Start with the `taon.jsonc` in the directory you are inspecting.
2. In a container, look for child directories with their own `taon.jsonc`. Apply the same check when you encounter a nested container.
3. In a standalone project, open `src/` and identify the entry point or module relevant to your task.
4. If the task spans projects, trace imports from the consuming application to the standalone project that exports the feature.

## Standalone project entry points

The files below are common entry points. Check the project's `taon.jsonc` and `src/` tree to see which artifacts it supports.

| Path | Purpose |
| --- | --- |
| `src/lib/index.ts` | Exports the project's reusable library code. |
| `src/app.ts` | Application entry point for the Angular frontend and Node.js backend. |
| `src/app.electron.ts` | Entry point for an Electron application. |
| `src/app.vscode.ts` | Entry point for a VS Code extension. |
| `src/cli.ts` | Entry point when the project produces a CLI tool. |
| `src/global.scss` | Global application styles. |

## How an application is assembled

A **project** owns source code and build configuration. A **context** assembles runtime building blocks such as controllers, entities, repositories, and providers. A reusable project can export a context through its library entry point so a consuming application can compose it with its own contexts.

See [Contexts](./taon-building-blocks/contexts.md) and [Dependency injection](./dependency-injection.md) for registration, inheritance, and injection patterns.

## Isomorphic source and runtime targets

Taon can build browser and backend versions of the same TypeScript source. Code regions determine which parts of a file are included in each output. Check the target before choosing a dependency, accessing a secret, or using a runtime-specific API.

| Target | Where backend logic runs | What to account for |
| --- | --- | --- |
| Node.js | In a Node.js process. | Keep server credentials and server-only integrations in the backend. |
| WebSQL | In the browser, with a browser-local database. | Browser code and storage are accessible to the user. Public webhooks require a separately reachable backend. |
| Cloudflare Worker | In a Cloudflare Worker. | Use Worker-compatible dependencies, bindings, and storage adapters. Check compatibility before using Node.js APIs. |
| Electron | In the Electron backend, with an Angular UI that communicates over IPC. | Keep backend and renderer code in the appropriate build regions. |

A project's supported targets depend on its configuration and dependencies. See [Isomorphic code regions](./isomorphic-code-regions.md) for how to write code that builds for the intended runtime.

## Build and run a standalone project

The Taon framework README lists Node.js 22 or later as a prerequisite. From the standalone project root, start the library watch build in one terminal.

```sh
taon build:lib
taon build:watch:lib
```

Start the Node.js application in a second terminal (ng server).
Taon watch build lib mode is needed when we want to see *ng serve* changes.

```sh
taon app:normal
```

For projects that support other runtime targets, the CLI also provides the following development commands.

| Command | Target |
| --- | --- |
| `taon app:websql` | Browser-local WebSQL backend |
| `taon app:cloudflare` | Cloudflare Worker |
| `taon app:electron` | Electron |

See the [CLI command guide](https://github.com/darekf77/tnp/blob/master/docs/COMMANDS.md) and [cloud tooling guide](https://github.com/darekf77/tnp/blob/master/docs/CLOUD-SERVICE.md) for build, release, and deployment workflows.

## Further reading

- [Controllers](./taon-building-blocks/controllers.md)
- [Entities](./taon-building-blocks/entities.md)
- [Migrations](./taon-building-blocks/migrations.md)
