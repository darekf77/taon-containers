# Taon SEO

`@taon-dev/seo` manages global SEO defaults and path-specific overrides for
static application routes. It resolves browser document metadata; it does not
analyze keywords, generate content, or automatically convert CMS posts into
SEO pages.

## Add and configure

Register `TaonSeoAbstractContext` in the application's backend context and
`TaonSeoBackofficeRoutes` in the admin route tree. Baseline does both when
`TaonBaselineAbstractContext` and `TaonBaselineBackofficeRoutes` are used.
The Angular app also needs the SEO provider:

```ts
import { provideTaonSeo } from '@taon-dev/seo';

export const appConfig = {
  providers: [
    ...provideTaonSeo(),
  ],
};
```

Merge the provider into the app's existing providers; keep its Taon context,
router, and startup providers. In the backoffice, set global defaults under
**SEO > General (Settings)** and add path overrides under **SEO > Pages**.
Blank optional page values inherit global defaults. Set `canonicalBaseUrl` in
global settings and `canonicalUrl` on a page override as absolute HTTP(S) URLs
without query strings or fragments.

## Metadata behavior and permissions

The SEO provider loads the global settings and matching page override after
Angular starts and on primary route changes. It updates title, description,
keywords, canonical URL, robots, and Open Graph metadata. Query strings,
fragments, matrix parameters, and auxiliary outlets do not select a page
override; trailing slashes are normalized.

Baseline shows SEO navigation to superusers or users with `toManageSeo`.
Configuration writes, page listings, and image uploads require this access;
public settings lookups and social-image downloads are available for rendering
and crawlers. Store images through Taon storage; the database stores image keys,
not temporary browser blob URLs.

## Runtime notes

`provideTaonSeo()` is an Angular/browser provider, while SEO settings and image
lookups are served by the registered Taon context. Client-side metadata updates
do not replace server-rendered metadata for crawlers that do not execute
JavaScript. Make the backend host and public social-image URLs reachable to
crawlers. For SSR, verify that the server rendering path emits the metadata
needed by the target crawler.

See [Baseline](./baseline.md) and the
[admin setup tutorial](../tutorial/add-taon-admin-to-existing-project.md).
