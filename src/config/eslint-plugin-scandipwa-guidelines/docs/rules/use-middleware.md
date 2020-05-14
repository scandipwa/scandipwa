# Wrap default export classes in middleware function (use-middleware)

Wrap default export classes in middleware function in order to make classes extensible and assign namespaces to them.

## Rule Details

Examples of **incorrect** code for this rule:

```js
class A { /** ... */ }

export default A;
```

Examples of **correct** code for this rule:

```js
class A { /** ... */ }

export default middleware(A, 'My/NameSpace/A');
```
