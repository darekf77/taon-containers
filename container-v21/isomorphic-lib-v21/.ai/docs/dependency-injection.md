# Dependency Injection Naming Conventions

## Angular services

Use the full class-based name for injected application services.

```ts
class MyExampleComponent {
  // GOOD - name based on the injected class
  myApiService = inject(MyApiService);

  // BAD
  api = inject(MyApiService);
}
```

### Short names for common Angular dependencies

Short, conventional names are allowed for well-known Angular framework dependencies when their meaning is obvious.

Examples:

```ts
class MyExampleComponent {
  cdr = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);
  router = inject(Router);
  injector = inject(Injector);
  destroyRef = inject(DestroyRef);
  location = inject(Location);
}
```

Do not unnecessarily expand conventional Angular names:

```ts
// NOT REQUIRED
changeDetectorRef = inject(ChangeDetectorRef);
activatedRoute = inject(ActivatedRoute);
```

For application-specific services, always prefer the full class-based name.

---

## Taon Angular services

Use the full class-based name of controllers injected into API services.

```ts
class MyExampleApiService extends TaonBaseAngularService {
  userController = this.inject(UserController);
}
```

Use the full class-based name of providers injected into config services.

```ts
class MyExampleConfigService extends TaonBaseAngularService {
  myUserProvider = this.inject(MyUserProvider);
}
```

Avoid shortened or generic names such as:

```ts
// BAD
controller = this.inject(UserController);
userCtrl = this.inject(UserController);

provider = this.inject(MyUserProvider);
userProv = this.inject(MyUserProvider);
```

---

## Taon framework DI

For Taon repositories, providers, controllers, and other injectable building blocks, use the full class-based name.

```ts
class MyExampleController {
  myUserRepository = this.inject(MyUserRepository);

  myBookProvider = this.inject(MyBookProvider);
}
```

Avoid shortened or generic names:

```ts
// BAD
repo = this.inject(MyUserRepository);
userRepo = this.inject(MyUserRepository);

provider = this.inject(MyBookProvider);
bookProv = this.inject(MyBookProvider);
```

### General rule

The injected property name should normally be the camelCase version of the injected class name:

```text
MyApiService       -> myApiService
UserController     -> userController
MyUserProvider     -> myUserProvider
MyUserRepository   -> myUserRepository
```

The exception is common Angular framework dependencies with established,
 unambiguous short names such as `cdr`, `route`, and `router`.
