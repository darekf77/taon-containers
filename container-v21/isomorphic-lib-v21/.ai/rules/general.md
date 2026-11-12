# General Rules

## Taon Project Structure

You are operating inside a **Taon workspace**. Taon projects do not necessarily follow a standard npm repository structure.

Before making any changes, identify the relevant Taon project(s) and inspect their root `taon.jsonc`.

### Project Types

Taon has two project types.

#### Standalone project

A standalone project has:

```json
{
  "type": "isomorphic-lib"
}
```

in its root `/taon.jsonc`.

Characteristics:

- Application/library source code is located in `/src`.
- It may be an independent Git repository.
- It may also exist inside a Taon container project.
- This is normally where production source-code changes should be made.

#### Container project

A container project has:

```json
{
  "type": "container"
}
```

in its root `/taon.jsonc`.

Characteristics:

- It contains multiple **standalone projects** and/or other **container projects**.
- Treat child projects as separate Taon projects.
- A task may require inspecting or modifying multiple child projects.
- **Never create Git branches in a container project.**

When working from a high-level workspace containing multiple Taon projects, do not assume that the workspace root itself is the project being modified. Locate the appropriate standalone project first.

---

# Allowed Modification Scope

## Source files only

Unless the user explicitly instructs otherwise in the current prompt, you may **only create, modify, move, or delete files inside the `/src` directory of the relevant standalone project(s)**.

For example, if a task affects:

```text
/taon-dev/cms
/taon-projects/cms
```

the allowed modification scope is:

```text
/taon-dev/cms/src/**
/taon-projects/cms/src/**
```

You may inspect files outside `/src` when necessary to understand the project, dependencies, architecture, configuration, or existing conventions.

However, **inspection does not grant permission to modify those files**.

### Allowed

You may:

- read files anywhere in the relevant workspace when needed for context
- create files inside the relevant project's `/src`
- modify files inside the relevant project's `/src`
- move files inside the relevant project's `/src`
- delete files inside the relevant project's `/src` when required by the task
- inspect sibling projects to understand existing Taon patterns and implementations

### Forbidden

Do not create, modify, move, or delete files outside the relevant project's `/src`.

This includes, but is not limited to:

```text
/package.json
/taon.jsonc
/tsconfig.json
/angular.json
/.github/**
/.ai/**
/node_modules/**
/dist/**
```

If completing part of the requested task would require changing a file outside `/src`, **do not make that change**.

Implement everything that can correctly be implemented within the allowed scope and leave the out-of-scope part unchanged.

Do not silently work around this restriction by modifying another configuration or generated file.

---

# Multi-Project Tasks

A single task may involve multiple Taon projects.

For example:

```text
/taon-dev/cms
/taon-projects/cms
```

When this happens:

1. Identify every project involved in the task.
2. Determine whether each project is a standalone project or a container.
3. Inspect the relevant projects before implementing the change.
4. Keep reusable/framework functionality in the appropriate reusable Taon project.
5. Keep application-specific functionality in the consuming application.
6. Modify only `/src/**` within each affected standalone project.
7. Do not duplicate reusable functionality in consuming projects when it belongs in a shared Taon project.

Do not assume that a task must be contained within a single Git repository merely because the agent was started from a common parent directory.

---

# Project and Artifact Management

Project and artifact management is the user's responsibility.

Do **not**:

- initialize Taon projects
- create Git branches in container projects
- build Taon projects or artifacts
- publish packages
- release packages or applications
- deploy applications
- install dependencies
- update dependencies
- run project setup commands
- run project initialization commands
- modify generated artifacts

Your responsibility normally ends after making the requested production source-code changes inside the appropriate `/src` directories.

---

# Taon CLI Commands

Do **not** run `taon` commands.

The only exception is migration creation:

```bash
taon mc my-new-migration
```

and language extractor
```bash
taon lang:extract
```

Do not run any other `taon` command unless the user explicitly requests it in the current prompt.

---

# ABSOLUTE RULE: Never Create or Modify Tests

Testing is **not part of your responsibility** unless explicitly requested by the user in the current prompt.

You MUST NOT create, generate, modify, move, or delete test files or test directories.

This includes, but is not limited to:

```text
*.spec.ts
*.test.ts
*.spec.js
*.test.js
/test/**
/tests/**
/__tests__/**
```

It also includes:

- test fixtures
- test helpers
- temporary test files
- test configuration
- generated tests
- modifications to existing tests

Do NOT add or modify tests merely because:

- the implementation would normally require tests
- existing code has tests
- repository conventions suggest tests
- tests would help verify the implementation
- adding tests is considered best practice
- acceptance criteria describe expected behavior

Do not create temporary tests and delete them afterward.

If a requested task would normally include test changes, **skip the test portion and implement only the production source code**.

## Explicit User Override

Tests may be created or modified **only when the user explicitly requests test work in the current prompt**.

Do not infer permission from:

- previous prompts
- previous tasks
- existing tests
- repository conventions
- the nature of the feature
- acceptance criteria
- best practices

---

# Configuration and Dependencies

Unless explicitly requested otherwise, never modify project, package, build, or workspace configuration.

In particular, never modify:

```text
/package.json
/taon.jsonc
```

Do not:

- modify `node_modules`
- install packages
- remove packages
- update package versions
- modify dependency declarations

If a requested implementation appears to require a new dependency, do not install or add it automatically. Prefer functionality already available in the workspace when appropriate, or leave the dependency/configuration portion unchanged.

---

# Task Boundaries

Implement the requested task and avoid unrelated cleanup.

Do not perform additional:

- refactoring unrelated to the task
- project maintenance
- dependency maintenance
- configuration changes
- test work
- builds
- publishing
- releasing
- deployment
- repository restructuring

Existing code in sibling Taon projects may be inspected and reused as a reference when useful.

---

# Highest-Priority Working Rule

Unless the user explicitly overrides these rules in the **current prompt**:

> **All modifications must be limited to `/src/**` of the standalone Taon project or projects involved in the task.**

You may inspect the wider Taon workspace, including containers and sibling projects, to understand architecture and existing implementations.

**Read broadly when necessary. Modify narrowly.**
