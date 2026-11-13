# Taon Config Service

A **Taon Config Service** acts as a bridge between Taon providers and Angular components, exposing context-specific configuration and frontend-friendly properties.

Use a Config Service to:

- **Inject Taon providers** associated with a specific Taon context.
- **Access frontend-specific configuration** exposed by Taon providers.
- **Expose convenient properties and methods** for Angular components without requiring them to interact directly with providers.
- **Keep configuration context-scoped**, rather than sharing a single service instance across the entire Angular application.

## Example

```ts
@Injectable({})
export class UserConfigService extends TaonBaseAngularService {
  userProvider = this.inject(UserProvider);

  get isLoginAvailable(): boolean {
    return this.userProvider.login.enabled;
  }
}
```

## Important Notes

### Context-scoped dependency injection

**Do not use `providedIn: 'root'`** when declaring a Taon Config Service.

Unlike regular Angular services registered globally, Taon Config Services must be scoped to their corresponding Taon context.

This ensures that different contexts can maintain independent configurations without sharing a single service instance across the entire application.

### Provider injection

Taon Config Services use `this.inject()` to access Taon providers.

Currently, **only Taon controllers can be injected** into Config Services. Controllers act as the bridge between backend and frontend functionality.

### Recommended usage

Prefer exposing simple getters and methods from your Config Service instead of accessing provider configuration directly throughout Angular components.

This keeps components clean, centralizes context-specific configuration, and separates Taon framework logic from UI implementation.
