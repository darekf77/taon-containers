# Track analytics events in a Taon app

This tutorial starts browser analytics once and records a custom marketing
interaction through the shared event API.

## 1. Register the analytics context

Include `TaonAnalyticsAbstractContext` in the active Taon backend context, or
use `TaonBaselineAbstractContext`, which already includes Analytics. Ensure
the application's session context is available as well.

## 2. Start the browser tracker

Provide `TaonAnalyticsTrackingService` in the Angular root component and call
`start()` once after Taon initialization:

```ts
import { TaonAnalyticsTrackingService } from '@taon-dev/analytics/src';

export class AppComponent implements OnInit {
  private readonly analytics = inject(TaonAnalyticsTrackingService);

  ngOnInit(): void {
    this.analytics.start();
  }
}
```

The tracker uses browser `localStorage`, `sessionStorage`, and router
navigation. Do not start it in a Node-only process.

## 3. Record an interaction

Call `recordEvent()` from the code that handles the interaction:

```ts
await this.analytics.recordEvent('banner-click', {
  category: 'marketing',
  data: { bannerId: 'summer' },
});
```

The event is saved with the generic analytics events. It does not create a
campaign or marketing report automatically.

## Verify

Open the Analytics backoffice with a user who has `toManageAnalytics`, trigger
the event in the browser, then inspect the event through the event API or
analytics data. The current Events page is a placeholder, so the absence of an
Events dashboard is not evidence that the tracker failed.

See the [Analytics reference](../taon-admin/analytics.md) for the session
timeout, storage, and backend event behavior.
