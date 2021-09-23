# Non-extensible components are not allowed. (no-non-extensible-components)

Rules preventing the extensibility issues:

- Non-extensible component import are not allowed. Use extensible bases instead of regular `Component` or `PureComponent`.

- Variables and classes if declared on root level must be exported (and not by default!)

## Rule Details

Make sure to export the class and variable declarations

Examples of **incorrect** code for this rule:

```js
import { PureComponent } from 'react';

const B = 123;

class A {
    /** ... */
}

export default A;
```

Examples of **correct** code for this rule:

```js
// notice no PureComponent import

export const B = 123;

export class A {
    /** ... */
}

export default A;
```
