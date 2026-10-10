## Angular Syntax and State

### Template syntax

- Prefer modern Angular control-flow syntax:
  - `@if`
  - `@else`
  - `@for`
  - `@switch`
  - `@defer`
- Use legacy structural directives such as `*ngIf` and `*ngFor` only when there is a concrete reason to do so.
- Do not convert modern Angular control flow back to legacy syntax.

### Signals and Observables

- Prefer Angular Signals for component state and reactive values used directly by templates.
- Prefer:
  - `signal()`
  - `computed()`
  - `effect()` when an actual side effect is required
- Do not introduce an Observable when a Signal provides a simpler solution.
- Use RxJS Observables when they naturally fit the problem, especially for:
  - asynchronous streams,
  - REST/API calls,
  - event streams,
  - RxJS operators and stream composition,
  - existing APIs that already expose Observables.
- Do not convert an Observable to a Signal merely for the sake of using Signals.
- Avoid unnecessary `BehaviorSubject` / `Subject` state when a Signal can represent the same state more clearly.

## Services

### API services

Inject the project's `api.service.ts` into components when communication with the Taon REST API is required.

Do not create duplicate HTTP/API logic directly inside components when the existing API service can be used.

### Configuration services

Inject the project's `config.service.ts` / `configs.service.ts` when a component needs global frontend/backend configuration.

Do not duplicate global configuration as local component state.

### State services

Create a dedicated `.state.service.ts` only when the component architecture actually requires shared or sufficiently complex state.

Do NOT create a state service automatically for every component.

Prefer keeping simple state directly inside the component using Signals.

Create a state service when, for example:

- state is shared between multiple components,
- state must survive component recreation,
- state logic becomes large enough that keeping it in the component hurts readability,
- multiple components need to coordinate through the same state.

## Component Internationalization (i18n)

All user-visible component text should use the Taon translation system when appropriate.

### Component setup

Use:

```ts
import { Taon } from 'taon/src';
import { Translation } from '@taon-dev/i18n/src';

const t = Translation.for(
  Taon.__FILE_RELATIVE_PATH,
  Taon.LANG_IMPORT_MAP,
);

@Component({
  selector: 'my-component',
  // ...
})
export class MyComponent {
  //#region injections

  t = t.for(this);

  //#endregion

  signalLabel = this.t.signal.gettext('Label signal');

  signalWithParams = this.t.signal.gettext('Params: [[ test ]]', {
    test: 'test param',
  });

  normalLabel = this.t.gettext('Normal label');

  normalLabelWithContext = this.t.gettext(
    'Normal label',
    {},
    'context of translation',
  );

  refresh = new BehaviorSubject({});

  valueInsideComponent = 'dynamic!';

  observableLabel$ = this.refresh.asObservable().pipe(
    switchMap(() =>
      this.t.$.gettext('I am [[ dynamicParam ]]', {
        dynamicParam: this.valueInsideComponent,
      }),
    ),
  );
}
```

### Choosing the translation API

Use Signal-based translations when the translated value should reactively update:

```ts
signalLabel = this.t.signal.gettext('Label signal');
```

With parameters:

```ts
signalWithParams = this.t.signal.gettext('Params: [[ test ]]', {
  test: 'test param',
});
```

Use a normal translation for static/non-reactive TypeScript values:

```ts
normalLabel = this.t.gettext('Normal label');
```

Use the optional context argument when the same source text may require a different translation depending on its meaning:

```ts
normalLabelWithContext = this.t.gettext(
  'Normal label',
  {},
  'context of translation',
);
```

Use the Observable translation API when the translation belongs naturally to an RxJS stream:

```ts
observableLabel$ = this.refresh.asObservable().pipe(
  switchMap(() =>
    this.t.$.gettext('I am [[ dynamicParam ]]', {
      dynamicParam: this.valueInsideComponent,
    }),
  ),
);
```

### Template usage

```html
<span>{{ signalLabel() }}</span>

<span>{{ signalWithParams() }}</span>

<span>{{ normalLabel }}</span>

<span>{{ normalLabelWithContext }}</span>

<span>{{ observableLabel$ | async }}</span>

<span>{{ t.gettext('This also works!') }}</span>

<span translate>This will also be translated!</span>
```

Prefer the simplest translation mechanism appropriate for the value.

Do not introduce an Observable solely for translation if a normal or Signal-based translation is sufficient.

Do not hardcode user-visible text in TypeScript when it should be translated.

## Dependency Injection

Always prefer Angular's `inject()` API over constructor injection.

GOOD:

```ts
private readonly router = inject(Router);
private readonly changeDetectorRef = inject(ChangeDetectorRef);
private readonly apiService = inject(MyApiService);
```

BAD:

```ts
constructor(
  private router: Router,
  private changeDetectorRef: ChangeDetectorRef,
  private apiService: MyApiService,
) {}
```

Use constructor injection only when there is a specific technical reason that prevents using `inject()`.

### Injection naming

Use descriptive names based on the injected class/service.

GOOD:

```ts
private readonly userService = inject(UserService);
private readonly notificationService = inject(NotificationService);
private readonly sessionApiService = inject(TaonSessionApiService);
```

Short conventional names are allowed for common Angular/router dependencies where they improve readability:

```ts
private readonly cdr = inject(ChangeDetectorRef);
private readonly router = inject(Router);
private readonly route = inject(ActivatedRoute);
```

Do not use arbitrary abbreviated names for application services.
