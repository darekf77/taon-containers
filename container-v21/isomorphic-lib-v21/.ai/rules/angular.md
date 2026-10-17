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


### Dependency Injection

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


## Component Internationalization (i18n)

All user-visible component text should use the Taon translation system when appropriate.

For all internationalization rules and examples, follow:

`../docs/i18n.md`

Before adding, modifying, or reviewing any user-visible text in Angular code, **read and follow `../docs/i18n.md`**.

Treat `../docs/i18n.md` as the **single source of truth** for:

- translation setup
- Signal translations
- synchronous translations
- Observable translations
- template translations
- translation parameters
- translation context
- deciding which strings should and should not be translated

Do not duplicate or invent alternative i18n patterns in Angular code.

If this file and `../docs/i18n.md` appear to conflict regarding internationalization, **`../docs/i18n.md` takes precedence**.
