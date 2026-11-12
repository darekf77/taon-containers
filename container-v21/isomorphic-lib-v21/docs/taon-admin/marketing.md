# Marketing-related analytics events

The marketing-related capability documented here is the generic event
collection in `@taon-dev/analytics`. It lets an application record interactions
such as a promotion or banner click. Analytics does not provide campaign
planning, email marketing, audience segmentation, or a marketing automation
engine.

## Record an interaction

Start `TaonAnalyticsTrackingService` once in the browser root component as
described in [Analytics](./analytics.md). Inject that service into the
component or application service that handles the interaction:

```ts
import { inject } from '@angular/core';
import { TaonAnalyticsTrackingService } from '@taon-dev/analytics/src';

export class BannerComponent {
  private readonly analytics = inject(TaonAnalyticsTrackingService);

  async onBannerClick(): Promise<void> {
    await this.analytics.recordEvent('banner-click', {
      category: 'marketing',
      data: { bannerId: 'summer' },
    });
  }
}
```

Use stable event names and structured data fields that your project can
interpret later. The event is stored in the shared analytics event table; it
does not automatically create a campaign report or change a user's access.

## Admin and package boundaries

Analytics event data is associated with its optional visitor, session, and user
relationships. Authenticated user IDs are taken from verified session tokens.
The Analytics backoffice is gated by `toManageAnalytics`.

Baseline also has a separate Marketing navigation entry and imports
`@taon-dev/marketing`; that package is distinct from the analytics event API.
Do not infer that the separate menu's features are implemented in
`@taon-dev/analytics`.

For event collection lifecycle and backend events, see
[Analytics](./analytics.md). For combined admin navigation, see
[Baseline](./baseline.md).
