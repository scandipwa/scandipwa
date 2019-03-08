# BEM

This project uses [BEM](https://en.bem.info/methodology/) (Block Element Modifier) approach to organize styles.

## BEM interpretation used in this project
- Blocks and elements start with uppercase: `Header`
- If block or element has 2 or more words in its name - they both start with uppercase: `MenuItem`
- Blocks and elements are divided with minus sign (`-`): `Header-MenuItem`
- Mods are divided with an underscore (`_`): `Header-MenuItem_visible`
- Mods start with lowercase
- Mods may consist of: 
  - a key and a value: `MenuItem_type_dropdown` or `MenuItem_type_defaultLocal` if modifier has 2 or more words in its key or value.
  - a key without value included in the name: `MenuItem_visible` 
- For boolean modifiers, the value is not included in the name: `MenuItem_visible` 
- If mod has 2 or more words in its name - it is written as follows: `backgroundColor_red`
- Block's element can't be accessed from outside the block

## How to use it in Javascript?

This projects uses [rebem-jsx-plugin](https://github.com/rebem/rebem-jsx) to implement BEM in this project.

### Creating a block
```html
<div block="Header">

<!-- Results into -->
<div className="Header">
```

### Creating an element
```html
<div block="Header" element="Message">

<!-- Results into -->
<div className="Header-Message">
```

### Creating a block which is an element of parent block
```html
<div block="Menu" mix={{ block="Header", element: "Menu" }}>

<!-- Results into -->
<div className="Menu Header-Menu">
```

### Using modificators

- Boolean modifier

```html
<div block="Menu" mix={{ block="Header", element: "Menu" }}, mods={{visible: true}}>

<!-- Results into -->
<div className="Menu Header-Menu_visible">
```

- Single key -> value modifier

```html
<div block="Menu" mix={{ block="Header", element: "Menu" }}, mods={{type: "horizontal"}}>

<!-- Results into -->
<div className="Menu Header-Menu_type_horizontal">
```

- Multiple key -> value modifier

```html
<div block="Menu" mix={{ block="Header", element: "Menu" }}, mods={{type: "horizontal", behaviour: "autoClose"}}>

<!-- Results into -->
<div className="Menu Header-Menu_type_horizontal Header-Menu_behaviour_autoClose">
```

## How to use it in SASS?

```html
<form class="Form Form_state_error">
  <div class="Field Form-Field">
    <span class="Field-Message">Error</span>
    <input class="Field-Input" name="default" placeholder="Please enter a value">
  </div>
</form>
```

- How to access block:
```scss
.Form {
    background-color: red;
}
```

- How to access block's element:
```scss
.Form {
    // & stands for parent selector
    // note that & is an array
    &-Field {
        background-color: blue;
    }
}
```

- How to access modified block's element:
```scss
.Form {
    // & stands for parent selector
    // note that & is an array
    &_state {
        &_error {
            .Field-Message {
                background-color: red;
            }
        }

        &_warning{
            .Field-Message {
                background-color: yellow;
            }
        }
    }
}
```
