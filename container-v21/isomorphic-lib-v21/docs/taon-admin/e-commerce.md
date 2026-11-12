# Taon E-commerce

`@taon-dev/e-commerce` provides product catalog, cart, order, payment
transaction, entitlement, and commerce backoffice features. It integrates with
CMS for product descriptions and courses. Stripe checkout and subscription
events are supported by the current implementation.

## Add and configure

The recommended admin integration is
[Taon Baseline](./baseline.md). Its context includes
`TaonECommerceAbstractContext`, which in turn includes the CMS context; its
lazy route registers `TaonECommerceBackofficeRoutes`. For a standalone
integration, register the e-commerce abstract context and route directly.

The storefront exports `TaonCartButtonComponent` and `TaonCartConfig`:

```ts
import { Component } from '@angular/core';
import {
  TaonCartButtonComponent,
  TaonCartConfig,
} from '@taon-dev/e-commerce/src';

@Component({
  imports: [TaonCartButtonComponent],
  template: '<taon-cart-button [config]="cartConfig" />',
})
export class StoreHeaderComponent {
  cartConfig: TaonCartConfig = {};
}
```

The component's `config` input accepts a `TaonCartConfig`. A working
application example also registers `TaonECommerceCartProvider` in its Taon
context; use that example when overriding the default cart behavior.

For Stripe, configure `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_KEY` in the
server-side Taon environment. Register the webhook URL shown by the Products
page's **Sync with Stripe** flow with Stripe. Never place either secret in
browser code. Payment completion and entitlements are finalized from verified
webhook events, not from the browser's success redirect.

## Use products, cart, and courses

Create products in **E-commerce > Products**, configure price and availability,
and optionally use **Link to post** to use a CMS post for the product details.
Customers add eligible products to the cart and complete checkout. Product
eligibility is checked on the server for ownership, active subscriptions,
stock, pending reservations, per-user limits, currency, and recurring
checkout compatibility.

The course components can display a public CMS root and its protected related
lessons. The CMS post's related-post order is preserved. Purchased media is
authorized by the server's session and entitlement-aware auth repository; a
browser-provided authorization context is only a refresh trigger.

## Permissions and runtime

Baseline shows the e-commerce menu to superusers or users with the exact
permission key `toManagerEcommerce`. Sensitive commerce operations are
validated by their Taon controllers and repositories as well.

The Stripe secret and webhook flow require a server-side runtime with a
reachable webhook endpoint. WebSQL may be useful for browser-local development
or UI testing, but it does not provide a place to keep Stripe secrets or
receive external Stripe webhooks. Cloudflare Worker deployments must configure
Worker bindings and a reachable webhook route; verify database and provider
support for that target before deploying.

See [CMS](./cms.md), [Session](./session.md), and
[Baseline](./baseline.md) for related setup.
