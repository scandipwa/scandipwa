/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    ProductContainer,
} from 'Component/Product/Product.container';
import { UrlRewrite } from 'Query/ProductList.type';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement, Url } from 'Type/Common.type';
import history from 'Util/History';
import { getSmallImage } from 'Util/Product/Extract';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode, objectToUri } from 'Util/Url';

import ProductCard from './ProductCard.component';
import {
    ProductCardComponentProps,
    ProductCardContainerFunctions,
    ProductCardContainerMapDispatchProps,
    ProductCardContainerMapStateProps,
    ProductCardContainerPropKeys,
    ProductCardContainerProps,
} from './ProductCard.type';

/** @namespace Component/ProductCard/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductCardContainerMapStateProps => ({
    ...sourceMapStateToProps(state),
    baseLinkUrl: state.ConfigReducer.base_link_url || '',
    productUsesCategories: state.ConfigReducer.product_use_categories || false,
    categoryUrlSuffix: state.ConfigReducer.category_url_suffix,
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/ProductCard/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductCardContainerMapDispatchProps => ({
    ...sourceMapDispatchToProps(dispatch),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
});

/** @namespace Component/ProductCard/Container */
export class ProductCardContainer extends ProductContainer<ProductCardContainerProps> {
    static defaultProps: Partial<ProductCardContainerProps> = {
        ...ProductContainer.defaultProps,
        hideWishlistButton: false,
        hideCompareButton: false,
        renderContent: null,
        isLoading: false,
        children: null,
        mix: {},
        layout: CategoryPageLayout.GRID,
    };

    containerFunctions: ProductCardContainerFunctions = {
        ...this.containerFunctions,
        showSelectOptionsNotification: this.showSelectOptionsNotification.bind(this),
    };

    containerProps(): Pick<ProductCardComponentProps, ProductCardContainerPropKeys> {
        const {
            children,
            mix,
            layout,
            hideCompareButton,
            hideWishlistButton,
            isLoading,
            renderContent,
            product,
            isPlp,
            onLoad,
            isMobile,
        } = this.props;

        return {
            ...super.containerProps(),
            children,
            hideCompareButton,
            hideWishlistButton,
            isLoading,
            layout,
            mix,
            renderContent,
            isPlp,
            thumbnail: getSmallImage(this.getActiveProduct()) || getSmallImage(product),
            linkTo: this.getLinkTo(),
            onLoad,
            isMobile,
        };
    }

    getLinkTo(): Url | undefined {
        const {
            baseLinkUrl,
            productUsesCategories,
            categoryUrlSuffix,
            product: { url, url_rewrites = [] },
            product,
        } = this.props;
        const { pathname: storePrefix } = new URL(baseLinkUrl || window.location.origin);
        const { location: { pathname } } = history;

        if (!url) {
            return undefined;
        }

        const { parameters } = this.state;
        const { state: { category = null } = {} } = history.location;
        const categoryUrlPart = pathname.replace(storePrefix, '').replace(categoryUrlSuffix, '');
        const productUrl = `${categoryUrlPart}/${url.replace(storePrefix, '')}`;

        // if 'Product Use Categories' is enabled then use the current window location to see if the product
        // has any url_rewrite for that path. (if not then just use the default url)
        const rewriteUrl: Partial<UrlRewrite> = url_rewrites.find(({ url }) => url.includes(productUrl)) || {};
        const rewriteUrlPath = productUsesCategories
            ? (rewriteUrl.url && appendWithStoreCode(rewriteUrl.url)) || url
            : url;

        return {
            pathname: rewriteUrlPath,
            state: { product, prevCategoryId: category },
            search: objectToUri(parameters),
        };
    }

    showSelectOptionsNotification(): void {
        const { showNotification } = this.props;

        showNotification(NotificationType.INFO, __('Please, select product options!'));
    }

    render(): ReactElement {
        return (
            <ProductCard
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
