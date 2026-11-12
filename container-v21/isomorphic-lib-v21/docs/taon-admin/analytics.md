# Taon Analytics

`@taon-dev/analytics` collects visitor, session, page-view, and generic event
records. The current backoffice includes all-time overview counts and a
visitor table; Pages View, Events, and Traffic Sources are placeholders rather
than complete reporting dashboards.

## Add and start tracking

Register `TaonAnalyticsAbstractContext` in the Taon backend context and
`TaonAnalyticsBackofficeRoutes` in the admin routes. Baseline includes both.
In the Angular root component, provide and start
`TaonAnalyticsTrackingService` once after Taon context initialization:

```ts
import { Component, OnInit, inject } from '@angular/core';
import { TaonAnalyticsTrackingService } from '@taon-dev/analytics/src';

@Component({
  selector: 'app-root',
  template: '',
})
export class AppComponent implements OnInit {
  private readonly analytics = inject(TaonAnalyticsTrackingService);

  ngOnInit(): void {
    this.analytics.start();
  }
}
```

The service needs browser storage and router navigation, so do not start it in a
Node-only backend. Calling `start()` once from the browser root component is the
pattern used by the example applications.

## Events and data behavior

Other browser-side services can inject the tracking service and record an
application event:

```ts
await this.analytics.recordEvent('banner-click', {
  category: 'marketing',
  data: { bannerId: 'summer' },
});
```

The service stores a random visitor ID in `localStorage` and a session ID in
`sessionStorage`. Reloads reuse the session; 30 minutes without recorded
activity starts a new session. Navigation completions record page views, and
pointer/keyboard activity is throttled. Timestamps come from the backend.
Durations are approximate; there is no unload beacon or background session
expiry job. No fingerprinting or user-agent parsing is performed.

Backend packages can inject `TaonAnalyticsEventRepository` and call `record()`.
Event names share one generic event table; backend-originated events may omit
visitor, session, and user associations. Authenticated user IDs are derived
from verified Taon session tokens, not from the collection payload.

## Permissions and runtime

Baseline shows Analytics navigation to superusers or users with
`toManageAnalytics`. The Angular tracking service runs in the browser; the
analytics context, repositories, and backoffice APIs run in the configured
Taon backend. WebSQL browser mode changes where backend code executes, so
verify that the selected database and storage behavior is appropriate before
using it as a production analytics store.

See [Marketing-related events](./marketing.md) and
[Baseline](./baseline.md), or follow the
[analytics event tutorial](../tutorial/track-analytics-events.md).
