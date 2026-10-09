# Taon AI Development Instructions

This project uses the Taon framework.

Before modifying code, understand the relevant Taon architecture and
follow the project's coding rules.
## Most important rule:
- do NOT install ANYTHING from package.json (do not use npm install or yarn install)
- only modify code from main project /src catalog
- taon frameowrk uses global 'taon' to build/install things (but you are not going to use it)

## Documentation

Framework documentation is located in:

.ai/docs/

Read documentation relevant to the task before implementing changes.

## Coding rules

Mandatory coding conventions are located in:

.ai/rules/

These rules override generic TypeScript, Angular, Express and TypeORM
best practices.

Do not replace a Taon pattern with a conventional framework pattern
simply because it is more common.

## Examples

Canonical implementations are located in:

.ai/examples/

When generating new Taon code, find the closest canonical example and
follow its structure.

## Existing code

Before creating a new abstraction:

1. Search the repository for similar functionality.
2. Prefer existing Taon helpers and abstractions.
3. Follow surrounding code style.
4. Avoid unrelated refactoring.

# Siblings projects

The current project may have sibling Taon projects in the parent directory.

For example:

cms/
session/

When working inside `cms`, you ARE ALLOWED to inspect sibling projects for reference.

In particular:

- `../session` contains the `@taon-dev/session` project.
- You may read/search files inside `../session/src`.
- Use it to understand existing Taon patterns, architecture, APIs, naming conventions,
  entities, controllers, repositories, components, and implementations.
- Prefer following established patterns from sibling Taon projects instead of
  inventing a new pattern when an equivalent implementation already exists.

IMPORTANT:

- Sibling projects are READ-ONLY reference material.
- NEVER modify, create, delete, rename, format, or move files outside the current project's `/src`.
- NEVER run commands that modify sibling projects.
- When asked to "check how session does it", inspect `../session/src`.

## Code modification rules

- NEVER run Prettier, ESLint auto-fix, `ng format`, or any other code formatter.
- NEVER reformat existing code.
- Preserve the existing formatting, whitespace, indentation, line wrapping, and import layout.
- Keep diffs minimal. Only modify lines required for the requested change.
- Do not reorder imports unless required for compilation.
- Do not make unrelated cleanup or stylistic changes.

## Verification

After modifying code from /src:

- don't do anything.

After making TypeScript/Angular changes:

- don't do anything.
