# Components

Application consist of many React components. Components are located in `src/app/components` folder.

## Inter-related components

Components may be divided into following groups:

- Category related: `CategoriesList`, `CategoryDetails`, `CategoryProductList`, `CategoryShoppingOptions`, `Swatch`.

- Product related: `ProductActions`, `ProductCard`, `ProductDescription`, `ProductDetails`, `ProductGallery`, `ProductPrice`, `ProductSort`, `RelatedProducts`.

- Cart related: `AddToCart`, `CartItem`, `CartSummary`, `DiscountCoupons`, 
`MiniCart`.

- CMS related: `Footer`, `Header`, `Menu`, `NewsletterSubsribe`, `HomeSlider`.

- Notification related: `Notification`, `NotificationList`.

There are components, which can not be grouped by a theme. They implement a specific common functional.

## Common components

### `Html`

The component created to parse HTML coming from BE into valid React components. We use it to replace incoming HTML elements with our implementation, those are: images and links:

- `<img>` – we replace to our custom [`Image`](#Image) component, to make it not load if out of viewport, define side ratio.

- `<a>` – we replace to `react-router-dom` `Link` components, so they push to `BrowserHistory API` and do not reload the page.

This component is common to see in "CMS related" components.

### `Meta`

The component is a rare place where we use third-party dependencies. We are updating website meta data using `react-helmet`. 

This component is common to see in [routes](./10-Architecture.md) (pages) components.

### `Breadcrumbs`

The component is responsible for displaying breadcrumbs. 

> Important note: the array of routes passed has to be reversed!

This component is common to see in [routes](./10-Architecture.md) (pages) components.

### `Image`

The component responsible for smooth image loading. Implements modern browser API to track image appearance in view-port, do not effect scrolling performance. Loads following images, based on `src` passed:

- The placeholder (SVG primitive)
- The WebP images (for better performance in Chromium browsers)
- The original image (as fallback, if WebP will be unsupported)

### `Figure`

Implements the HTML5 figure functional but with custom styles and our `Image` inside.

### `ContentWrapper`

The content wrapper. Wraps content inside. Has required `label` prop as accessibility enforcement.

### `TextPlaceholder`

Is the very common type of placeholders, which allows for simple placeholder display before the internal content is not loaded.

### `Field`

Is a collection of input types, generates and handles the custom HTML wrapper around input, can display input notes, messages, labels.

Implements following input types: `number`, `text`, `checkbox`, `radio`, `textarea`.

> The `select` type support will be added in future versions.

### `RangeSelector`

Is one more exception out of "no third party dependencies" rule. The wrapper for `react-input-range` component.

### `Slider`

The awesome mostly CSS based custom slider. Main feature: **does not append new slides to DOM** this makes it work very efficient and easy to debug. Slider supports the "infinite scroll" feature (without appending any additional slides)!
