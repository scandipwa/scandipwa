# Styles

This application uses [`SASS` syntax `SCSS`](https://sass-lang.com/guide) for styling.

## Important notes

1. We recommend declaring custom color variables for every new component in root block, so they can be changed easily. However this is not done properly now. You may be surprised seeing `var(--color-breadcrumbs-background);` used in completely unrelated to breadcrumbs places.
    > We plan to restructure variable declaration in nearest releases. 
2. We recommend to keep the nesting as low as possible. But due pure CSS implementation of some features, the nesting may grow huge. For example, the largest nesting level is in menu: `.Menu_isActive .Menu-Item_d_0:first-child:focus-within > .Menu-Wrapper` (the nesting of 3 elements, and specificity of 50). 
    > Try keep **styles are bellow 30 specificity points** for better performance.
3. We recommend not using outdated css properties like `float`. However they are still present in small amount in our application (3 times). 
    > The outdated CSS properties will be removed in future releases.
4. We have not properly tested the application in non-chromium based browsers. 
    > The browser support will be extended in the future.

## File Structure

- `src`
    - `component` – ReactJS components
        - `ComponentName` – Component root
            - `ComponentName.style.scss` – Component styles 
    - `style` – Application wise styles [read more about styles](./Styles.md)
        - `abstract` – Virtual SASS functions, mixins (non compilable) **will be injected into every component style**
            - `_abstract.scss` – File which imports all abstract functions in right order
            - `_*.scss` – Abstract functional implementations
        - `base` – Styles to native HTML5 elements
            - `_reset.scss` – CSS reset
            - `_root.scss` – `:root` styles (CSS custom variables declaration)
            - `_*.scss` – Native element style

## Styling with BEM

Read more about writing SASS styles for BEM [here](./BEM.md)

## The concepts

To achieve consistent styling and lower nesting levels (which helps to reduce reflow) we have worked out few rules.

### Native HTML5 elements styling

For native HTML5 element styling it is recommended to use CSS custom properties (variables).

For example, here is how basic button styles look (declared in `_button.scss`):

```scss
button {
    border-radius: 0;
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: var(--button-padding);
    color: var(--button-color);
    background-color: var(--button-background);
    transition-property: background-color, color;
    transition-timing-function: ease-out;
    transition-duration: .25s;
    cursor: pointer;
    border: {
      width: var(--button-border-width);
      style: solid;
      color: var(--button-border);
    }
}
```

**NOTE**: variables are declared in `_root.scss`:

```scss
:root {
    --button-padding: 1.1rem 1.9rem;
    --button-color: var(--color-text-white);
    --button-background: var(--color-primary-base);
    --button-border: var(--color-primary-base);
    --button-hover-background: var(--color-primary-dark);
    --button-hover-color: var(--color-text-white);
    --button-hover-border: var(--color-primary-base);
    --button-border-width: 1px;
}
```

To change the appearance, all you need is to change variable value (example is taken from `Swatch.style.scss`):

```scss
.Swatch {
    $round-border-color: rgba(0, 0, 0, .4);

    --button-padding: 0;
    --button-color: var(--color-breadcrumbs-current);
    --button-background: transparent;
    --button-hover-color: var(--color-primary-base);
    --button-hover-background: transparent;
    --button-border: var(--color-breadcrumbs-current);
}
```

> **IMPORTANT**: Not all base styles are custom CSS variables written. This will be changed in future releases. Currently buttons are the only covered part. 

### Styles with accessibility in mind

For elements which require user interaction, `:focus` and `:focus-within` are often required and should always be styled.

```scss
...
  .Menu_isActive & {
      &:hover,
      &:focus,
      &:focus-within {
          > .Menu-Wrapper {
              transform: scaleX(1);
              opacity: 1;

              @include mobile {
                  left: 0;
              }
          }
      }
  }
...
```

> **NOTE**: it is very complex to keep nesting levels low while styling with accessibility in mind. We do not have any solutions for this issue at the moment.

## Functions available

In you component styles `ComponentName.style.scss` the functions declared in `_abstract.scss` are available.

### Media mixins

For easier styling for different device screens we have included media mixins out of the box. They are applied in following order:

```
                  0                       768px                   1024px                  +∞    
desktop           |                       |                       █████████████████████████
before-desktop    ████████████████████████████████████████████████|                       |
tablet            |                       ████████████████████████|                       |
after-mobile      |                       █████████████████████████████████████████████████
mobile            ████████████████████████|                       |                       |
```

In order to use them:

```scss
...
&-Brand {
    display: block;
    margin: auto;
    white-space: nowrap;
    ...
    
    @include mobile {
        max-width: 9.5rem;
        font-size: .8rem;
    }
}
...
```

### Custom color theme

For easier configuration we have made the theme colors appear as SASS map.
It is declared in `_variables.scss`. Many CSS custom variables will be generated based on map values.

For example, this map declaration:

```scss
$colors: (
    breadcrumbs: (
        background: #f3f3f3,
        base: #404040,
        current: #888888,
        arrow: #404040
    ),
    ...
)
```

Will be compiled into:

```scss
:root {
    --color-breadcrumbs-background: #f3f3f3;
    --color-breadcrumbs-base: #404040;
    --color-breadcrumbs-current: #888888;
    --color-breadcrumbs-arrow: #404040;
}
```

And can be used in your styles like so:

```scss
.Breadcrumbs {
    background-color: var(--color-breadcrumbs-background);
}
```

It is also possible to get the hex color or variable using custom SASS function:

```scss
.Breadcrumbs {
    background-color: color(breadcrumbs, background); // will give you variable
    background-color: color(breadcrumbs, background, true); // will give you HEX color
}
```

[< Back to project description](./Project.md)