
### Taon providers

Injectable (service like) classes singleton (in context) classes.



```ts
@TaonProvider({
  className: 'TaonConfigProvier',
})
export class TaonConfigProvier extends TaonBaseProvider {
  config = {
    lang: 'en',
    country: 'Poland'
  }
}
```
