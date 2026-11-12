# Taon CMS

`@taon-dev/cms` provides posts and related content, categories, tags, comments,
content permissions, revisions, and storage-backed media. Course views and
structured JSON-table posts build on ordinary CMS posts; they do not require a
separate course entity.

## Add and configure

For the full admin setup, add `TaonBaselineAbstractContext` and
`TaonBaselineBackofficeRoutes`; Baseline includes `TaonCmsAbstractContext` and
the lazy CMS backoffice route. A CMS-only application can register
`TaonCmsAbstractContext` and `TaonCmsBackofficeRoutes` directly.

```ts
import { TaonCmsAbstractContext } from '@taon-dev/cms/src';
import { Taon, TaonBaseContext } from 'taon/src';

export const AppContext = Taon.createContext(() => ({
  contextName: 'AppContext',
  contexts: {
    TaonBaseContext,
    TaonCmsAbstractContext,
  },
}));
```

Add `TaonCmsBackofficeRoutes` to the application's route configuration. The
application must also configure the storage provider used for uploaded media
and initialize the Taon context/database. CMS pages depend on the session and
authorization contexts; the CMS abstract context includes
`TaonSessionAbstractContext`.

## Use the backoffice

The CMS navigation provides post, course, category, tag, asset, comment, and
content-permission features. Posts support published or draft content, related
posts, thumbnails, revisions, and media attachments. Categories can be nested;
tags are flat. Product pages can link to CMS posts, and course components can
render a protected post and its related lessons; see
[e-commerce](./e-commerce.md).

The backoffice's CMS entry is visible to superusers or users with
`hasAccess.toManageCms`. Individual controllers can apply finer checks such as
`toManagePosts`; grant the relevant permission through Taon authorization
rather than relying on a hidden menu item as the security boundary. CMS APIs
also enforce their own access and publication rules.

Storage assets are accessed through Taon storage APIs. For example, the Assets
page lists stored files and requests short-lived private URLs rather than
buffering file contents in the browser. Configure the storage backend and
public/private access policy for the deployment target.

## Runtime notes

The Angular backoffice runs in the browser. Its context and data APIs must be
registered on the application's Taon backend. WebSQL mode places backend work
in the browser, so it is not a substitute for a server when the application
needs server-managed credentials or externally reachable media URLs. Check the
selected storage provider's support before enabling CMS uploads in WebSQL or a
Cloudflare Worker.

See [Baseline](./baseline.md) for combined registration and the
[admin setup tutorial](../tutorial/add-taon-admin-to-existing-project.md).
