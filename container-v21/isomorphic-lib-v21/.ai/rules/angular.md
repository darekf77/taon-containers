## What to use

- use modern syntax @if , @else etc.
- use old syntax ngIf, ngFor only if make sense
- use signals (prefer it over observables)
- use observable only if it make sense

## Services

- inject api.service.ts inside components to use taon REST api 
- inject configs.service.ts inside components to provide
global backend/fronend configuration
- create .state.services.ts only if component architectures requires it

## Dependency injection

Always prefer Angular `inject()`.

GOOD:

private readonly router = inject(Router);

BAD:

constructor(private router: Router) {}
