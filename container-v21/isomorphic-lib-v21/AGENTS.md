# Taon project instructions

This project uses Taon. Read the applicable reference before changing code, and
verify framework behavior against the implementation when a guide does not
cover it.

## Core rules

- Do not install dependencies with `npm install` or `yarn install`; use the
  Taon project workflow.
- Make application changes in `/src`, preserve Taon patterns and generated
  files, and do not reformat unrelated code.
- Reuse existing classes and helpers. Do not replace Taon conventions with
  conventional Angular, Express, or TypeORM patterns without checking the
  project guidance first.
- Keep code changes surgical. Do not modify sibling projects.

## References

- [Architecture and runtime targets](.ai/docs/architecture.md)
- [Taon contexts](.ai/docs/taon-building-blocks/contexts.md)
- [Isomorphic code regions](.ai/docs/isomorphic-code-regions.md)
- [Building-block references](.ai/docs/taon-building-blocks/)
- [Coding rules](.ai/rules/)
- [Canonical examples](.ai/examples/)

## Existing code and verification

Before creating an abstraction, search `/src` for an equivalent implementation.
For Taon CLI workflows, see the
[CLI command guide](https://github.com/darekf77/tnp/blob/master/docs/COMMANDS.md).

The project's tests and the Taon Testbench are useful for runtime-specific
examples; do not assume that Node.js, WebSQL, and Cloudflare Worker support are
interchangeable.

After code changes, run the smallest relevant test or build available in the
project. Do not claim a command or runtime behavior is verified unless it was
checked against source or a working example.
