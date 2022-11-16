/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { Location } from 'history';

import { ProductListOptions } from 'Query/ProductList.type';
import { Product as BreadcrumbProduct } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { ProductMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { OfflineStore } from 'Store/Offline/Offline.type';
import { RecentlyViewedProductItem } from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.type';
import { Merge, ReactElement } from 'Type/Common.type';
import { HistoryState } from 'Util/History/History.type';
import { IndexedCustomOption, IndexedProduct } from 'Util/Product/Product.type';

export interface ProductPageContainerMapStateProps {
    isOffline: boolean;
    product: Partial<IndexedProduct>;
    metaTitle?: string;
    isMobile: boolean;
    store: string;
    areReviewsEnabled: boolean;
}

export interface ProductPageContainerMapDispatchProps {
    changeHeaderState: (state: NavigationState) => void;
    changeNavigationState: (state: NavigationState) => void;
    requestProduct: (options: Partial<ProductListOptions>) => void;
    updateOfflineStore: (state: Partial<OfflineStore>) => void;
    updateBreadcrumbs: (breadcrumbs: BreadcrumbProduct, prevCategoryId: number) => void;
    updateMetaFromProduct: (product: ProductMeta) => void;
    goToPreviousNavigationState: () => void;
    addRecentlyViewedProduct: (product: RecentlyViewedProductItem, store: string) => void;
}

export interface ProductPageContainerBaseProps {
    productSKU: string;
    productID: number;
}

export type ProductPageContainerProps = ProductPageContainerMapStateProps
& ProductPageContainerMapDispatchProps
& ProductPageContainerBaseProps;

export interface ProductPageContainerState {
    parameters: Record<string, string>;
    currentProductSKU: string;
    activeProduct: IndexedProduct | null;
    // !FIXME: Most likely this props is never used. We must remove it.
    productOptionsData?: Record<string, string | string[]>;
}

export interface ProductPageComponentProps {
    getLink: (key?: string, value?: string) => string;
    parameters: Record<string, string>;
    dataSource: Partial<IndexedProduct>;
    activeProduct: Partial<IndexedProduct>;
    areDetailsLoaded: boolean;
    isInformationTabEmpty: boolean;
    isAttributesTabEmpty: boolean;
    setActiveProduct: (product: Partial<IndexedProduct>) => void;
    useEmptyGallerySwitcher: boolean;
    isVariant: boolean;
    isProductInformationTabEmpty: () => boolean;
    isProductAttributesTabEmpty: () => boolean;
    isMobile: boolean;
    location: Location<HistoryState>;
    areReviewsEnabled: boolean;
}

export type ProductPageContainerComponentPropKeys =
    | 'areDetailsLoaded'
    | 'isAttributesTabEmpty'
    | 'isInformationTabEmpty'
    | 'activeProduct'
    | 'dataSource'
    | 'useEmptyGallerySwitcher'
    | 'isVariant'
    | 'isMobile'
    | 'parameters'
    | 'location'
    | 'areReviewsEnabled';

export type OptionWithId = Merge<IndexedCustomOption, { option_id: string }>;

export interface ProductPageTab {
    name: string;
    shouldTabRender: () => boolean;
    render: (key: string) => ReactElement;
}
