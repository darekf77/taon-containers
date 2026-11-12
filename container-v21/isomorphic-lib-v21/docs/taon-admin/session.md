# Taon Session

`@taon-dev/session` supplies Taon login, registration, session state, and
authorization. It also provides user, session, role, group, and authorization
backoffice routes. It is designed for Taon applications, not as a standalone
authentication package.

## Add it to an application

For a complete admin installation, use
[Taon Baseline](./baseline.md), which includes
`TaonSessionAbstractContext` and its backoffice routes. To use Session by
itself, register `TaonSessionAbstractContext` in the active Taon context and
add the specific session routes needed by the application.

The browser UI exports `TaonSessionButtonComponent` and
`TaonSessionComponent`. The example app imports the button and binds a
`TaonSessionConfig`:

```ts
import { Component } from '@angular/core';
import {
  TaonSessionComponent,
  TaonSessionConfig,
} from '@taon-dev/session/src';

@Component({
  imports: [TaonSessionComponent],
  template: '<taon-session [config]="config" />',
})
export class SessionHostComponent {
  config: TaonSessionConfig = {};
}
```

The configuration is optional in the example application; configure a
dashboard destination only when the app has a real need for it. Do not put
credentials in a client-side configuration.

## Main features and authorization

- Session login and registration support Taon's JWT, cookie, and header
  authentication paths.
- `TaonSessionMiddleware` can protect controller methods. Apply it before
  inherited middleware when the request must be authenticated first.
- The session context exposes authorization checks for admin capabilities.
  Baseline's user, session, and authorization menu entries use
  `toManageUsers`, `toManageSessions`, and `toManageAuthorization`; superusers
  can also see these entries.
- CMS, commerce, SEO, and analytics use their own permission checks. Logging in
  alone does not grant administrator access.

Use the session state returned by the server as the source of authorization.
Do not treat a client-provided user ID or permission list as proof of identity.

## Runtime notes

Register the session context in the backend context that serves the application.
Node.js and WebSQL are distinct Taon deployment modes; browser mode does not
make server secrets available to browser code. Use the server environment for
credentials and deployment-specific authentication configuration.

See the [Baseline integration](./baseline.md) for a working context and
backoffice route, and the [admin tutorial](../tutorial/add-taon-admin-to-existing-project.md)
for an existing Taon application.
