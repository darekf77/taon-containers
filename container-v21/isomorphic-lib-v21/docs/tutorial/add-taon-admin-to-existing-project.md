# Add Taon Admin to an existing Taon project

This tutorial adds the Baseline backoffice to an existing Taon app and verifies
that its modules and permission-gated navigation load.

## Prerequisites

- An existing Taon project with its organization/container dependencies
  available. Use the project's Taon dependency workflow rather than running
  `npm install` in a Taon container.
- `@taon-dev/baseline` and its required packages declared and available through
  that project dependency workflow.
- Node.js 22 or later for the current Taon CLI.
- A Taon application context and Angular router already initialized.
- Session authorization configured, plus a test account that can be granted
  the required admin permissions.

If you are starting a project instead, use the
[CLI commands guide](https://github.com/darekf77/tnp/blob/master/docs/COMMANDS.md)
and verify commands against the installed CLI version.

## 1. Add Baseline to the Taon context

Import `TaonBaselineAbstractContext` and include it alongside
`TaonBaseContext` in the active application context:

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

This registers the module contexts composed by Baseline, including Session,
CMS, E-commerce, Analytics, SEO, and Marketing. It does not configure your
application's database, storage, authentication secrets, or payment provider.

## 2. Add the lazy backoffice route

Register Baseline's route in your app router. Keep the application context
available to the named outlet:

```ts
import { TaonBaselineBackofficeRoutes } from '@taon-dev/baseline/src';
import { TaonBaselineBackofficeOutletName } from '@taon-dev/ui/src';
import { TAON_CONTEXT } from 'taon/src';

const adminRoute = {
  path: 'backoffice',
  outlet: TaonBaselineBackofficeOutletName,
  providers: [
    { provide: TAON_CONTEXT, useFactory: () => AppContext },
  ],
  loadChildren: () =>
    import('@taon-dev/baseline/src').then(
      module => module.TaonBaselineBackofficeRoutes,
    ),
};
```

Add `adminRoute` to the app's existing routes. The outlet constant is `admin`;
the example applications expose the admin outlet through their app navigation.
Use the same router and `TAON_CONTEXT` initialization pattern as the rest of
your app.

## 3. Configure authorization and module services

Grant the test account the feature permissions it needs. Baseline checks
permissions such as `toManageCms`, `toManagerEcommerce`, `toManageAnalytics`,
`toManageSeo`, and `toManageMarketing`; Session user, session, and
authorization pages have their own permissions. Superusers can see the
corresponding routes. Controllers still enforce authorization for protected
operations.

Configure storage for CMS uploads. For Stripe checkout, set
`STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_KEY` in the server-side Taon
environment and register the displayed webhook URL in Stripe. These settings
are not required just to open the backoffice.

## 4. Build and verify

Build the project library before starting the app, then run the project's
normal development target. The CLI names below are implemented by Taon:

```sh
taon build:watch:lib
taon app:normal
```

Open the application and use its admin entry point to open the `admin` outlet.
Confirm that the Baseline shell and **Welcome** page render. Sign in with the
authorized test account and verify that the granted modules appear; use an
account without those permissions to confirm protected menu entries do not
appear. Open one module page and confirm its data request succeeds.

For the complete route and runtime caveats, see
[Taon Baseline](../taon-admin/baseline.md). Module-specific setup is in the
[Session](../taon-admin/session.md), [CMS](../taon-admin/cms.md),
[E-commerce](../taon-admin/e-commerce.md), [SEO](../taon-admin/seo.md),
[Analytics](../taon-admin/analytics.md), and
[Marketing](../taon-admin/marketing.md) references.
