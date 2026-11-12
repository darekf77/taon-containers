# File Naming and Layout Conventions

## TypeScript filenames

Use a lowercase kebab-case base name followed by dot-separated suffixes that identify the file’s role. The base name should usually match the feature or subfeature folder that owns the file.

| Class name | Filename |
| --- | --- |
| `MyFeatureEntity` | `my-feature.entity.ts` |
| `MyFeatureController` | `my-feature.controller.ts` |
| `MyFeatureRepository` | `my-feature.repository.ts` |
| `MyFeatureApiService` | `my-feature.api.service.ts` |
| `MyFeatureConfigService` | `my-feature.config.service.ts` |
| `MyFeatureStateService` | `my-feature.state.service.ts` |
| `MyFeatureComponent` | `my-feature.component.ts` |
| `MyFeatureAbstractContext` | `my-feature.abstract.context.ts` |
| `MyFeatureActiveContext` | `my-feature.active.context.ts` |

## Angular component files

Keep each Angular component’s TypeScript, HTML template, and SCSS styles in separate files in the same folder. Use the same `.component` filename stem for all three. Reference the external files through `templateUrl` and `styleUrl` (or `styleUrls`).

```text
my-feature-backoffice/
  my-feature-backoffice.component.ts
  my-feature-backoffice.component.html
  my-feature-backoffice.component.scss
  my-feature-backoffice.state.service.ts
```

## Feature folder layout

Keep feature-level entities, controllers, and repositories in the feature folder. When a feature contains both a controller and Angular components, put each component in its own subfolder and use the subfolder name as the component’s filename base.

```text
my-feature/
  my-feature.entity.ts
  my-feature.controller.ts
  my-feature.repository.ts
  my-feature-table/
    my-feature-table.component.ts
    my-feature-table.component.html
    my-feature-table.component.scss
  my-feature-row/
    my-feature-row.component.ts
    my-feature-row.component.html
    my-feature-row.component.scss
```
