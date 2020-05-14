# All components should be extensible. (use-extensible-base)

For class to be extensible it should be derived from extensible base. Replacements of non-extensible bases are as follows and should not be imported - these are global.

- PureComponent -> ExtensiblePureComponent
- Component -> ExtensibleComponent
- no base -> ExtensibleClass

## Rule Details

The `ExtensiblePureComponent`, `ExtensibleComponent` and `ExtensibleClass` requires no import.

Examples of **incorrect** code for this rule:

```js
import { PureComponent } from 'react';
class A extends PureComponent { /** ... */ }
```

Examples of **correct** code for this rule:

```js
// notice, no import, it is a global variable
class A extends ExtensiblePureComponent { /** ... */ }
```
