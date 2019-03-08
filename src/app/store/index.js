import {
    createStore, combineReducers
} from 'redux';

import { CmsBlocksAndSliderReducer } from 'Store/CmsBlocksAndSlider';
import { CmsPageReducer } from 'Store/CmsPage';
import { CategoryReducer } from 'Store/Category';
import { NotificationReducer } from 'Store/Notification';
import { BreadcrumbsReducer } from 'Store/Breadcrumbs';
import { ProductReducer } from 'Store/Product';
import { HeaderAndFooterReducer } from 'Store/HeaderAndFooter';
import { CartReducer } from 'Store/Cart';
import { NoMatchReducer } from 'Store/NoMatch';
import { RelatedProductsReducer } from 'Store/RelatedProducts';

const reducers = combineReducers({
    CmsBlocksAndSliderReducer,
    CmsPageReducer,
    CategoryReducer,
    NotificationReducer,
    BreadcrumbsReducer,
    ProductReducer,
    HeaderAndFooterReducer,
    CartReducer,
    NoMatchReducer,
    RelatedProductsReducer
});

const store = createStore(
    reducers,
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
