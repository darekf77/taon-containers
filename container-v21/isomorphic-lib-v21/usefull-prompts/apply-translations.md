# Apply Internationalization to the Entire Project

Apply the existing Taon internationalization (i18n) system to **all applicable files inside `/src`**.

Follow the project's existing **Internationalization (i18n)** rules exactly.

## Goal

Go through the entire `/src` directory and find user-visible text that should be translated.

Replace appropriate hardcoded user-visible strings with the Taon translation system.

This applies to both:

- frontend code
- backend code

Do NOT blindly translate every string.

Only translate text that is intended to be displayed or communicated to the user.

## Frontend

Inspect all applicable frontend files inside `/src`, including:

- Angular components
- component templates
- services
- directives
- dialogs
- forms
- validation messages
- notifications
- tooltips
- labels
- buttons
- menu items
- placeholders
- titles
- empty-state messages
- confirmation messages
- errors intended for the user

Examples of strings that SHOULD normally be translated:

```ts
label = 'Save';
title = 'Edit user';
tooltip = 'Delete this item';
message = 'Operation completed successfully';
```

```html
<button>Save</button>
<h2>Edit user</h2>
<span>No results found</span>
```

Convert them using the appropriate Taon translation mechanism.

### Choose the correct API

Use the simplest appropriate translation mechanism.

Prefer Signal translations when the value should react to language changes:

```ts
label = this.t.signal.gettext('Save');
```

Use normal synchronous translations when reactivity is unnecessary:

```ts
label = this.t.gettext('Save');
```

Use Observable translations only when the translation naturally belongs to an existing RxJS stream:

```ts
label$ = source$.pipe(
  switchMap(() => this.t.$.gettext('Save')),
);
```

Do NOT create an Observable solely for translation.

For simple template text, use the project's supported template translation mechanism when appropriate:

```html
<span translate>No results found</span>
```

or:

```html
<span>{{ t.gettext('No results found') }}</span>
```

Follow existing project conventions when deciding between these approaches.

### Translation parameters

Do NOT construct translated sentences by concatenating translated and dynamic fragments when the whole sentence can be translated.

Avoid:

```ts
this.t.gettext('Hello') + ' ' + username;
```

Prefer:

```ts
this.t.gettext('Hello [[ username ]]', {
  username,
});
```

This allows translators to translate the complete sentence correctly.

## Backend

Inspect backend code for user-facing text returned or sent to users.

Examples include:

- API response messages
- validation messages
- authentication messages
- emails
- notifications
- user-facing errors

For controller request translation, use the request-specific `t` provided by Taon:

```ts
return async (req, res, { t }) => {
  return t.gettext('Something went wrong');
};
```

Do NOT create:

```ts
const t = Translation.for(
  Taon.__FILE_RELATIVE_PATH,
  Taon.LANG_IMPORT_MAP,
);
```

for controller request translation.

Backend controller translations must use the `t` supplied through:

```ts
(req, res, { t })
```

Use only synchronous translation APIs there.

Do NOT use:

```ts
t.signal
t.$
```

on the backend.

## What NOT to translate

Do NOT translate strings that are internal implementation details.

Examples:

```ts
'GET'
'POST'
'/api/users'
'userId'
'accessToken'
'profile-picture'
'WINDOW'
'admin'
'localhost'
```

Also do NOT translate:

- enum values
- object/property names
- database column names
- entity names used internally
- API paths
- route paths
- file paths
- CSS classes
- selectors
- IDs
- storage keys
- configuration keys
- environment variable names
- event names
- logging/debugging messages intended only for developers
- protocol values
- MIME types
- Material icon names
- code identifiers
- test data unless it represents actual user-visible UI text

For example:

```html
<mat-icon>delete</mat-icon>
```

`delete` is a Material icon identifier and MUST NOT be translated.

Likewise:

```ts
path: 'users'
```

is a route path and MUST NOT be translated.

But:

```ts
menuItem: 'Users'
```

is user-visible and SHOULD be translated if the API supports translated values there.

## Preserve behavior

This task is an **i18n migration**, not a refactoring task.

Do NOT:

- redesign components
- change business logic
- change application behavior
- rename unrelated variables
- reorganize files
- introduce new architecture
- modify APIs unnecessarily
- perform unrelated cleanup

Make only changes required to correctly internationalize user-visible text.

## Scope restrictions

Follow the project's general coding rules.

In particular:

- modify files only inside `/src`
- do NOT modify `package.json`
- do NOT modify `taon.jsonc`
- do NOT modify project configuration
- do NOT create tests
- do NOT create `*.spec.ts`
- do NOT create `*.test.ts`
- do NOT create test configuration
- do NOT build the project
- do NOT publish anything
- do NOT release anything
- do NOT initialize anything

## Existing translations

Before changing a file, inspect how translation is already implemented in that file and nearby files.

If a file already has:

```ts
const t = Translation.for(...);
```

or:

```ts
t = t.for(this);
```

reuse the existing setup.

Do NOT create duplicate translation helpers.

Preserve existing translated strings unless they are clearly incorrect.

## Work systematically

Process the complete `/src` tree.

Do not stop after converting a few obvious components.

For each applicable file:

1. inspect the file for user-visible text
2. distinguish user-visible strings from internal/programmatic strings
3. apply the appropriate Taon translation mechanism
4. preserve dynamic parameters using `[[ parameter ]]`
5. preserve existing behavior
6. continue to the next file

The task is complete only after the entire `/src` tree has been inspected for applicable user-visible strings.

When uncertain whether a string is user-visible, inspect its usage before modifying it. Do not translate strings blindly based only on their English-looking content.
