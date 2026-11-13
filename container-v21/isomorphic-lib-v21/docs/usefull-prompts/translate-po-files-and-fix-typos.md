Fix all translations in the `.po` files for the following locales only:

- `pl-PL`
- `de-DE`

Also review `.ts` and `.html` files for **clear typos or obvious language/grammar mistakes in translatable source strings**.

Requirements:
- Review and fix all incorrect, missing, or poor-quality translations in the `pl-PL` and `de-DE` `.po` files.
- Preserve the meaning and intent of the original source strings.
- Keep placeholders, interpolation variables, formatting, and special syntax unchanged.
- Preserve valid `.po` file structure and metadata.
- Do not modify any other locale `.po` files.

For `.ts` and `.html` files:
- Fix only **clear typos, misspellings, or obvious grammar mistakes** in user-facing/translatable strings.
- Do not rewrite or rephrase text merely for style.
- Do not change application logic, TypeScript code, HTML structure, bindings, variables, or formatting unless required to correct the translation string.
- When a source translation string is corrected, make sure the corresponding `pl-PL` and `de-DE` translations remain correct and consistent.

Allowed files:
- `pl-PL` `.po` files
- `de-DE` `.po` files
- `.ts` files containing translatable strings
- `.html` files containing translatable strings

**Do not modify any other files.**
