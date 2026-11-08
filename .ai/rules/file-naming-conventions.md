# File Naming Conventions

All TypeScript filenames use lowercase kebab-case.

The artifact type is represented using dot-separated suffixes.

Examples:

MyFeatureEntity
-> my-feature.entity.ts

MyFeatureController
-> my-feature.controller.ts

MyFeatureRepository
-> my-feature.repository.ts

MyFeatureApiService
-> my-feature.api.service.ts

MyFeatureConfigService
-> my-feature.config.service.ts

MyFeatureStateService
-> my-feature.state.service.ts

MyFeatureComponent
-> my-feature.component.ts

The filename should normally contain the name of its parent feature/folder.

Example:

/my-feature/
  my-feature.entity.ts
  my-feature.controller.ts
  my-feature.repository.ts

/my-feature-backoffice/
  my-feature-backoffice.component.ts
  my-feature-backoffice.component.html
  my-feature-backoffice.component.scss
  my-feature-backoffice.state.service.ts
