/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Subscribe } from 'unstated';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    ProductContainer
} from 'Component/Product/Product.container';
import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';
import { GRID_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { FilterType } from 'Type/Category.type';
import { ChildrenType, MixType } from 'Type/Common.type';
import { LayoutType } from 'Type/Layout.type';
import history from 'Util/History';
import { getSmallImage } from 'Util/Product/Extract';
import { appendWithStoreCode, objectToUri } from 'Util/Url';

import ProductCard from './ProductCard.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/ProductCard/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    baseLinkUrl: state.ConfigReducer.base_link_url || '',
    productUsesCategories: state.ConfigReducer.product_use_categories || false,
    categoryUrlSuffix: state.ConfigReducer.category_url_suffix
});

/** @namespace Component/ProductCard/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/ProductCard/Container */
export class ProductCardContainer extends ProductContainer {
    static propTypes = {
        ...ProductContainer.propTypes,
        selectedFilters: FilterType,

        // Link building
        productUsesCategories: PropTypes.bool.isRequired,
        categoryUrlSuffix: PropTypes.string.isRequired,
        baseLinkUrl: PropTypes.string.isRequired,

        hideCompareButton: PropTypes.bool,
        hideWishlistButton: PropTypes.bool,
        isLoading: PropTypes.bool,

        renderContent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        showNotification: PropTypes.func.isRequired,

        children: ChildrenType,
        mix: MixType,
        layout: LayoutType
    };

    static defaultProps = {
        ...ProductContainer.defaultProps,
        selectedFilters: {},
        hideWishlistButton: false,
        hideCompareButton: false,
        renderContent: false,
        isLoading: false,
        children: null,
        mix: {},
        layout: GRID_LAYOUT
    };

    containerFunctions = {
        ...this.containerFunctions,
        showSelectOptionsNotification: this.showSelectOptionsNotification.bind(this)
    };

    containerProps() {
        const {
            children,
            mix,
            layout,
            hideCompareButton,
            hideWishlistButton,
            isLoading,
            renderContent,
            product
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
            thumbnail: getSmallImage(this.getActiveProduct()) || getSmallImage(product),
            linkTo: this.getLinkTo()
        };
    }

    getLinkTo() {
        const {
            baseLinkUrl,
            productUsesCategories,
            categoryUrlSuffix,
            product: { url, url_rewrites = [] },
            product
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
        const rewriteUrl = url_rewrites.find(({ url }) => url.includes(productUrl)) || {};
        const rewriteUrlPath = productUsesCategories
            ? (rewriteUrl.url && appendWithStoreCode(rewriteUrl.url)) || url
            : url;

        return {
            pathname: rewriteUrlPath,
            state: { product, prevCategoryId: category },
            search: objectToUri(parameters)
        };
    }

    showSelectOptionsNotification() {
        const { showNotification } = this.props;

        showNotification('info', __('Please, select product options!'));
    }

    render() {
        return (
            <Subscribe to={ [SharedTransitionContainer] }>
                { ({ registerSharedElement }) => (
                    <ProductCard
                      { ...this.containerFunctions }
                      { ...this.containerProps() }
                      registerSharedElement={ registerSharedElement }
                    />
                ) }
            </Subscribe>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
