# Coding standard

## Write abstract code

Reusability is important, so keep it DRY. If you are writing something - think about [Open-closed principle](https://en.wikipedia.org/wiki/Open–closed_principle) 

```javascript
constructor(props) {
    super(props);
    this.notification = React.createRef();
}

componentDidMount() {
    this.notification.current.style.setProperty('--notification-lifespan', '400ms');
}
```

## Destructure `props` and `state` before using data

You must not refer `this.props` and `this.states` directly except for *destructuring*. 
Simple use desctructuring assignment in the beginning of the function, in example:

```javascript
render() {
    const { notification } = this.props;
    const { isNotificationVisible } = this.state;
    const { msgText, msgType, msgDebug } = notification;

    // Using those properties
}
```

## Do not interact with  `document` elements directly 

ReactJS must track components, while using `document` to reference and later change 
DOM nodes prevents ReactJS normal flow.
You must use [references](https://reactjs.org/docs/refs-and-the-dom.html) instead. 

```javascript
constructor(props) {
    super(props);
    this.notification = React.createRef();
}

componentDidMount() {
    this.notification.current.style.setProperty('--notification-lifespan', '400ms');
}
```

## Use CSS variables

It is often useful to control components appearance from javascript - use [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) for that.
Use `Util/CSS` helper for more convenience.

```css
.Notification {
    --notification-lifespan: 0;
    animation: fadeout 400ms var(--notification-lifespan) ease-in-out forwards;
}
```

```javascript
const LIFESPAN = 5000;

constructor(props) {
    super(props);
    this.notification = React.createRef();
}

componentDidMount() {
    CSS.setVariable(this.notification, 'notification-lifespan', `${LIFESPAN}ms`);
}
```

## Use _ for "private" functions

When importing class your IDE or code editor might help you with auto-completion. For private (internal) function not appearing in the top of suggestion list we recommend using _ notation for method names.  

> There is a mix of these _ notated and non _ notated functions at the moment. We plan to migrate to _ notation completely in future release.

```javascript
/**
 * Prepare custom attribute filter queries
 * @param {Object} customFilters
 * @return {String}
 */
_getCustomAttributeFilters(customFilters = {}) {
    return Object.keys(customFilters).map((key) => {
        const attribute = customFilters[ key ];
        if (attribute.length) return `${ key }: { in: [ ${ attribute.join(',') } ] } `;
    }).join(',');
}

/**
 * get ProductList query
 * @param  {Object} options A object containing different aspects of query, each item can be omitted
 * @return {Query} ProductList query
 * @memberof ProductListQuery
 */
getQuery(options) {
    ...
}
```


