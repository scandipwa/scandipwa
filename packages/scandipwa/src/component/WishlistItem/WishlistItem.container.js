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
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import SwipeToDelete from 'Component/SwipeToDelete';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { ProductType } from 'Type/ProductList';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { CONFIGURABLE } from 'Util/Product';
import { debounce } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

import WishlistItem from './WishlistItem.component';
import { UPDATE_WISHLIST_FREQUENCY } from './WishlistItem.config';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);
export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

/** @namespace Component/WishlistItem/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/WishlistItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    updateWishlistItem: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWishlistItem(dispatch, options)
    ),
    removeFromWishlist: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeItemFromWishlist(dispatch, options)
    ),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Component/WishlistItem/Container */
export class WishlistItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        addProductToCart: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        updateWishlistItem: PropTypes.func.isRequired,
        removeFromWishlist: PropTypes.func.isRequired,
        handleSelectIdChange: PropTypes.func.isRequired,
        isRemoving: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired,
        isEditingActive: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isRemoving: false
    };

    containerFunctions = {
        addToCart: this.addItemToCart.bind(this),
        removeItem: this.removeItem.bind(this, false, true),
        redirectToProductPage: this.redirectToProductPage.bind(this)
    };

    state = {
        isLoading: false
    };

    removeItemOnSwipe = this.removeItem.bind(this, false, true);

    changeQuantity = debounce((quantity) => {
        const { product: { wishlist: { id: item_id } }, updateWishlistItem } = this.props;
        updateWishlistItem({ item_id, quantity });
    }, UPDATE_WISHLIST_FREQUENCY);

    changeDescription = debounce((description) => {
        const { product: { wishlist: { id: item_id } }, updateWishlistItem } = this.props;
        updateWishlistItem({ item_id, description });
    }, UPDATE_WISHLIST_FREQUENCY);

    containerProps() {
        const {
            handleSelectIdChange,
            isEditingActive,
            isMobile,
            isRemoving,
            product
        } = this.props;
        const { isLoading } = this.state;

        return {
            changeQuantity: this.changeQuantity,
            changeDescription: this.changeDescription,
            attributes: this.getAttributes(),
            isLoading,
            handleSelectIdChange,
            isEditingActive,
            isMobile,
            isRemoving,
            product
        };
    }

    getConfigurableVariantIndex = (sku, variants) => Object.keys(variants).find((i) => variants[i].sku === sku);

    getAttributes = () => {
        const { product: { variants, configurable_options, wishlist: { sku: wishlistSku } } } = this.props;

        const { attributes = [] } = variants.find(({ sku }) => sku === wishlistSku) || {};

        return attributes ? Object.values(attributes).reduce((acc, { attribute_code, attribute_value }) => {
            const {
                attribute_options: {
                    [attribute_value]: {
                        value,
                        label
                    } = {}
                } = {}
            } = configurable_options[attribute_code] || {};

            if (value === attribute_value) {
                acc.push(label);

                return acc;
            }

            return acc;
        }, []) : [];
    };

    addItemToCart() {
        const { product: item, addProductToCart, showNotification } = this.props;
        const {
            type_id,
            variants,
            wishlist: {
                id, sku, quantity, buy_request
            }
        } = item;

        if (!isSignedIn()) {
            return null;
        }

        if (type_id === CONFIGURABLE) {
            const configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);

            if (!configurableVariantIndex) {
                history.push({ pathname: appendWithStoreCode(item.url) });
                showNotification('info', __('Please, select product options!'));

                return Promise.resolve();
            }

            item.configurableVariantIndex = configurableVariantIndex;
        }

        this.setState({ isLoading: true });

        return addProductToCart({ product: item, quantity, buyRequest: buy_request })
            .then(
                /** @namespace Component/WishlistItem/Container/addItemToCartAddProductToCartThen */
                () => {
                    this.removeItem(id);
                    showNotification('success', __('Product Added To Cart'));
                },
                /** @namespace Component/WishlistItem/Container/addItemToCartAddProductToCartCatch */
                () => this.showNotification('error', __('Error Adding Product To Cart'))
            )
            .catch(
                /** @namespace Component/WishlistItem/Container/addItemToCartAddProductToCartThenThenCatch */
                () => this.showNotification('error', __('Error cleaning wishlist'))
            );
    }

    showNotification(...args) {
        const { showNotification } = this.props;
        this.setState({ isLoading: false });
        showNotification(...args);
    }

    removeItem(noMessages = true, isRemoveOnly = false) {
        const { product: { wishlist: { id: item_id } }, removeFromWishlist, handleSelectIdChange } = this.props;
        this.setState({ isLoading: true });

        handleSelectIdChange(item_id, isRemoveOnly);

        return removeFromWishlist({ item_id, noMessages });
    }

    redirectToProductPage() {
        const { product: { url } } = this.props;

        history.push({ pathname: appendWithStoreCode(url) });
    }

    renderRightSideContent = () => (
        <button
          block="WishlistItem"
          elem="SwipeToDeleteRightSide"
          onClick={ this.removeItemOnSwipe }
          aria-label={ __('Remove') }
        >
            { __('Delete') }
        </button>
    );

    render() {
        const { isLoading } = this.state;

        return (
            <SwipeToDelete
              renderRightSideContent={ this.renderRightSideContent }
              topElemMix={ { block: 'WishlistItem' } }
              onAheadOfDragItemRemoveThreshold={ this.containerFunctions.removeItem }
              isLoading={ isLoading }
            >
                <WishlistItem
                  { ...this.containerProps() }
                  { ...this.containerFunctions }
                />
            </SwipeToDelete>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistItemContainer);
