# Taon Baseline

`@taon-dev/baseline` is the composition layer for Taon's admin backoffice. Its
`TaonBaselineAbstractContext` includes Session, Sudo, Emails, CMS, E-commerce,
Analytics, Marketing, and SEO contexts. `TaonBaselineBackofficeRoutes` lazily
loads their admin routes and gates menu entries using the current session's
permissions.

## Register the context and route

Add the abstract context to the application's active Taon context:

```ts
import { TaonBaselineAbstractContext } from '@taon-dev/baseline/src';
import { Taon, TaonBaseContext } from 'taon/src';

export const AppContext = Taon.createContext(() => ({
  contextName: 'AppContext',
  contexts: {
    TaonBaseContext,
    TaonBaselineAbstractContext,
  },
}));
```

Register Baseline's route in the application's Angular router. The example
apps use the named `admin` outlet exposed as
`TaonBaselineBackofficeOutletName`, and provide the same active context to that
route:

```ts
import { TaonBaselineBackofficeRoutes } from '@taon-dev/baseline/src';
import { TaonBaselineBackofficeOutletName } from '@taon-dev/ui/src';
import { TAON_CONTEXT } from 'taon/src';

const routes = [
  {
    path: 'backoffice',
    outlet: TaonBaselineBackofficeOutletName,
    providers: [
      { provide: TAON_CONTEXT, useFactory: () => AppContext },
    ],
    loadChildren: () =>
      import('@taon-dev/baseline/src').then(
        module => module.TaonBaselineBackofficeRoutes,
      ),
  },
];
```

Use your application's existing Taon initialization and router providers.
Baseline brings module contexts and navigation together; it does not replace
those app-specific providers or deployment configuration.

## Configure access

The backoffice routes are lazy-loaded. CMS, E-commerce, Analytics, SEO,
Marketing, user, session, and authorization entries are shown only when the
session has the corresponding permission or the user is a superuser.
Permission names include `toManageCms`, `toManagerEcommerce`,
`toManageAnalytics`, `toManageSeo`, `toManageMarketing`, `toManageUsers`,
`toManageSessions`, and `toManageAuthorization`.

Grant permissions using the Session authorization/group workflow, then test
with both an authorized and unauthorized account. Menu visibility is not the
security boundary: module controllers also validate protected operations.

## Runtime and project dependencies

The route tree is Angular/browser code. The active Taon context runs on the
backend chosen by the application. Node.js is the normal server target;
WebSQL runs backend logic in the browser and does not provide server-side
secrets or public webhook reception. Cloudflare Worker deployments need their
own bindings and target-compatible database/storage providers. Baseline's
abstract context does not select or configure those providers.

The example apps register `TaonBaselineAbstractContext` in their active context
and lazy-load `TaonBaselineBackofficeRoutes` in the `admin` outlet. See
[Session](./session.md), [CMS](./cms.md), [E-commerce](./e-commerce.md),
[SEO](./seo.md), [Analytics](./analytics.md), and
[Marketing-related events](./marketing.md) for module details. To register
Baseline step by step, follow the
[existing-project setup tutorial](../tutorial/add-taon-admin-to-existing-project.md).
