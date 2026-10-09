# General Rules

## Allowed scope

You are responsible **only for writing and modifying source code inside the project's `/src` directory**.

You may:

- create files inside `/src`
- modify files inside `/src`
- delete files inside `/src` when required by the task

**Do not create, modify, move, or delete any file outside `/src`.**

This rule applies even when modifying a file outside `/src` would normally be required to complete the task.

For example, do **not** modify:

```text
/package.json
/taon.jsonc
/tsconfig.json
/angular.json
/.github/*
/.ai/*
/node_modules/*
```

If a requested change would require modifying something outside `/src`, leave that part unchanged.

---

## Do not manage Taon projects or artifacts

Project and artifact management is the user's responsibility.

Do **not**:

- initialize Taon projects
- build Taon projects or artifacts
- publish packages
- release packages or applications
- deploy applications
- install project dependencies
- run project setup or initialization commands

Your responsibility ends with making the requested source-code changes inside `/src`.

---

## Taon CLI commands

Do **not** run `taon` commands.

The **only exception** is creating a migration:

```bash
taon mc my-new-migration
```

Use this command only when the requested task explicitly requires creating a new migration.

Do not run any other `taon` command.

---

## ABSOLUTE RULE: Never create tests

Testing is NOT part of your responsibility in this repository.

You MUST NOT create, generate, modify, move, or delete test files or
test directories under ANY circumstances.

This includes, but is not limited to:

- `*.spec.ts`
- `*.test.ts`
- `*.spec.js`
- `*.test.js`
- `/test`
- `/tests`
- `/__tests__`
- any test fixture directories
- any test helper files
- any temporary test files
- any test configuration files

Examples of FORBIDDEN actions:

- creating `something.spec.ts`
- creating `something.test.ts`
- creating `/tests`
- creating `/src/tests`
- creating `/__tests__`
- adding tests as part of implementing a feature
- adding tests as "verification"
- adding tests because they are considered best practice
- generating temporary tests and deleting them afterward
- modifying existing tests to accommodate your implementation
- creating test configuration

DO NOT create tests even if:
- the implementation would normally require tests
- existing code has tests
- repository conventions suggest adding tests
- you want to verify your implementation
- a framework or library normally expects tests

If the user's task would normally involve adding or updating tests,
SKIP THE TEST PORTION OF THE TASK.

Only write the requested production source code.

### Explicit user override

Tests are allowed ONLY when the user explicitly says in the CURRENT PROMPT
that they want you to create or modify tests.

Do NOT infer permission to create tests from:
- the nature of the task
- existing tests
- previous tasks
- repository conventions
- best practices
- acceptance criteria mentioning expected behavior

---

## Configuration and project files

Do not modify project configuration, package configuration, build configuration, or other root-level files.

In particular, never modify:

```text
/package.json
/taon.jsonc
```

Do not modify dependencies or `node_modules`.

---

## Most important rule

**Unless the user explicitly instructs otherwise, all changes must be limited to `/src`.**

When completing a task, do not perform additional project maintenance, configuration,
 testing, building, dependency installation, publishing, releasing, or deployment work.
