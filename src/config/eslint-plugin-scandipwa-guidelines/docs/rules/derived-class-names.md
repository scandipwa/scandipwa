# Class name must match the name of the file it is declared in. (derived-class-names)

Expected class names for all the files **other than components** are `name + prefix` (e.g. class inside of `AddToCart.container.js` file must be called `AddToCartContainer` and not otherwise).

## Rule Details

Notice, that this rule is not applied to `component` postfix.

Examples of **incorrect** code for this rule:

```js
// in MyComponent.container.js
class Abc { /** ... */ }

// in Hello.component.js
class HelloComponent { /** ... */ }
```

Examples of **correct** code for this rule:

```js
// in MyComponent.container.js
class MyComponentContainer { /** ... */ }

// in Hello.component.js
class Hello { /** ... */ }
```
