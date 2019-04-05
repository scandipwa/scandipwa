# Architecture

## The entry-point

The application entry point (located in `src/app/index.js`) includes Redux provider declaration and the application router inclusion.

In this file the `process.env.NODE_ENV` based tools are configured:

1. The hot reload configuration for `development`

2. The ReactDevTools disabled for `prodction`

## The main router

The application router (located in `src/app/route/index.js`) is responsible for application routing. It is implemented using `react-router-dom`. Routes are declared inside of the `Switch` which means there is only one route visible at any point of the time.

Router controls the mounting of following components: 

- `HomePage`, 

- `TestPage`, 

- `CategoryPage`, 

- `ProductPage`, 

- `CmsPage`, 

- `CartPage`, 

- `CheckoutPage`, 

- `NoMatch`. 

At the same time it contains initialization of `Header`, `Footer`, `Breadcrumbs` and `NotificationList` components 
regardless the requested URL path. Those components are always visible during navigation within the application.

From the data perspective, the application common data is also requested: the CMS blocks for Footer and complete Menu.
 The `HeaderAndFooter` store is being used for that.

> **This is the place, where the first request to `GraphQL` starts it\`s way**. There must be 2 requests in total for initial rendering: one for common data between all pages (controlled by `HeaderAndFooter` store) and the second for any page related content (requested from upper mentioned components).

> Please note, that at this point `HeaderAndFooter` dispatcher is dispatching the `CmsBlocksAndSlider` action. All CMS blocks are available via global state property `blocks`.

Below is the routing map:

| Mounted component | URL path    | Is exact? |
|-------------------|-------------|-----------|
| HomePage          | `/`         | yes       |
| CategoryPage      | `/category` | no        |
| ProductPage       | `/product`  | no        |
| CmsPage           | `/page/:id` | no        |
| CartPage          | `/cart`     | yes       |
| CheckoutPage      | `/checkout` | yes       |
| NoMatch           | –           | no        | 

> Notice the URL parameter is not set for the `/category` and `/product` – which means **there will be no URL params directly available in URL for `CategoryPage` and `ProductPage` components**. This is done because we would not like to limit the possible category nesting (for example: `/category/main/sub/sub`). We are using `Url` module from `src/app/util/Url` in order to resolve the path.

> The URL param is present in `CmsPage`. We have left it, because it allowed for more "transparent" implementation of CMS page functionality. 

This part of the application might be a topic of changes in the future.

## The main store

The application main store combines all of the available reducers. Additionally, it makes sure that the ReduxDevTools will be disabled in production.

> Please, **keep action names and global state properties unique to every store**. This is important, because we are 
using only one provider for the application. This means all actions will be combined along with all global state properties.

The included reducers are: 

- `CmsBlocksAndSliderReducer`, 

- `CmsPageReducer`, 

- `CategoryReducer`, 

- `NotificationReducer`, 

- `BreadcrumbsReducer`, 

- `ProductReducer`, 

- `HeaderAndFooterReducer`, 

- `CartReducer`, 

- `NoMatchReducer`, 

- `RelatedProductsReducer`.

As you may see, most of Reducers are related to one specific component. Here is detailed connections between store and related component:

| Reducer name              | Declared state properties                                                                | State listening component(s)                                       | Action dispatching component(s)                                 | Notes for developers                                                                                                                                      |
|---------------------------|------------------------------------------------------------------------------------------|--------------------------------------------------------------------|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| CmsBlocksAndSliderReducer | `blocks`, `slider`                                                                       | NewsletterSubscribe, CategoryDetails, Footer, HomeSlider, HomePage | CategoryDetails, HomePage                                       | **Very strange that `HeaderAndFooterReducer` is dispatching `CmsBlocksAndSliderReducer` action**. It is frustrating. Should be changed in future release. |
| CmsPageReducer            | `page`, `isLoading`                                                                      | CmsPage                                                            | CmsPage                                                         | `isLoading` is a very non-unique name for a state. Should be changed in future release.                                                                   |
| CategoryReducer           | `category`, `subCategories`, `items`, `totalItems`, `sortFields`, `filters`, `isLoading` | CategoryPage                                                       | CategoryPage                                                    | –                                                                                                                                                         |
| NotificationReducer       | `notifications`                                                                          | NotificationList                                                   | NotificationList                                                | This component is never used, and it\`s internals are outdated. Component will be revisited in future release.                                            |
| BreadcrumbsReducer        | `breadcrumbs`, `areBreadcrumbsVisible`                                                   | Breadcrumbs                                                        | CartPage, CategoryPage, CmsPage, HomePage, NoMatch, ProductPage | –                                                                                                                                                         |
| ProductReducer            | `product`, `filters`                                                                     | ProductPage                                                        | ProductPage                                                     | –                                                                                                                                                         |
| HeaderAndFooterReducer    | `menu`, `isWebpSupported`                                                                | Menu, Image                                                        | Main Router (`src/app/route/index.js`)                          | Please see `CmsBlocksAndSliderReducer` Notes column.                                                                                                      |
| CartReducer               | `products`, `totals`                                                                     | MiniCart, CartPage                                                 | CartItem, MiniCart, ProductActions, ProductCard, CartPage       | –                                                                                                                                                         |
| NoMatchReducer            | `noMatch`                                                                                | NoMatchHandler                                                     | NoMatchHandler                                                  | –                                                                                                                                                         |
| RelatedProductsReducer    | `relatedProducts`                                                                        | RelatedProducts                                                    | RelatedProducts                                                 | Please note, the `ProductDispatcher` is also calling an action from `RelatedProducts`.                                                                    |
