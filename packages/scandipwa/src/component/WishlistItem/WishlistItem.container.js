/* eslint-disable */
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

import PRODUCT_TYPE from 'Component/Product/Product.config';
import SwipeToDelete from 'Component/SwipeToDelete';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { ProductType } from 'Type/ProductList.type';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { ADD_TO_CART } from 'Util/Product';
import { getProductInStock } from 'Util/Product/Extract';
import { getSelectedOptions, magentoProductTransform } from 'Util/Product/Transform';
import { Debouncer } from 'Util/Request';
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
    isMobile: state.ConfigReducer.device.isMobile,
    wishlistId: state.WishlistReducer.id
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
        wishlistId: PropTypes.number.isRequired,
        isEditingActive: PropTypes.bool.isRequired,
        setIsQtyUpdateInProgress: PropTypes.func
    };

    static defaultProps = {
        isRemoving: false,
        setIsQtyUpdateInProgress: () => {}
    };

    containerFunctions = {
        addToCart: this.addItemToCart.bind(this),
        removeItem: this.removeItem.bind(this, false, true),
        redirectToProductPage: this.redirectToProductPage.bind(this),
        setQuantity: this.setQuantity.bind(this)
    };

    state = {
        isLoading: false
    };

    removeItemOnSwipe = this.removeItem.bind(this, false, true);

    getAttributes = this.getAttributes.bind(this);

    changeQuantityDebouncer = new Debouncer();

    changeDescriptionDebouncer = new Debouncer();

    changeDescription = this.changeDescriptionDebouncer.startDebounce((description) => {
        const { wishlistId, product: { wishlist: { id: item_id } }, updateWishlistItem } = this.props;

        if (!isSignedIn()) {
            return;
        }

        updateWishlistItem({
            wishlistId,
            wishlistItems: [{
                wishlist_item_id: item_id,
                description
            }]
        });
    }, UPDATE_WISHLIST_FREQUENCY);

    changeQuantity = this.changeQuantityDebouncer.startDebounce(async (quantity) => {
        const {
            wishlistId,
            product: {
                wishlist: {
                    id: item_id
                }
            },
            updateWishlistItem,
            setIsQtyUpdateInProgress
        } = this.props;

        if (!isSignedIn()) {
            return;
        }

        await updateWishlistItem({
            wishlistId,
            wishlistItems: [{
                wishlist_item_id: item_id,
                quantity
            }]
        });

        setIsQtyUpdateInProgress(false);
    }, UPDATE_WISHLIST_FREQUENCY);

    __construct(props) {
        super.__construct(props);
        this.state = {
            isLoading: false,
            currentQty: this.getQuantity()
        };
    }

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
            inStock: this.productIsInStock(),
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

    productIsInStock() {
        const { product } = this.props;

        return getProductInStock(product);
    }

    setQuantity(quantity) {
        const { setIsQtyUpdateInProgress } = this.props;
        this.setState({ currentQty: quantity });

        setIsQtyUpdateInProgress(true);
    }

    getConfigurableVariantIndex = (sku, variants) => Object.keys(variants).find((i) => variants[i].sku === sku);

    getAttributes() {
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

    getProducts() {
        const {
            product: {
                wishlist: {
                    buy_request
                }
            },
            product: item
        } = this.props;

        const { currentQty } = this.state;

        const selectedOptions = getSelectedOptions(buy_request);

        // take input value in case item in wishlist hasn't been updated yet (if you change qty and click "Add to cart" immediately)
        const quantity = currentQty || this.getQuantity();

        return magentoProductTransform(ADD_TO_CART, item, quantity, [], selectedOptions);
    }

    getQuantity() {
        const {
            product: {
                type_id: typeId,
                wishlist: {
                    quantity,
                    buy_request: buyRequest
                }
            }
        } = this.props;

        if (typeId !== PRODUCT_TYPE.grouped) {
            return quantity;
        }

        const { super_group: superGroup = {} } = JSON.parse(buyRequest);

        return superGroup;
    }

    async addItemToCart() {
        const {
            product: item,
            addProductToCart,
            showNotification
        } = this.props;

        const {
            type_id,
            variants,
            wishlist: {
                id,
                sku
            }
        } = item;

        if (!isSignedIn()) {
            return;
        }

        if (type_id === PRODUCT_TYPE.configurable) {
            const configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);

            if (!configurableVariantIndex) {
                history.push({ pathname: appendWithStoreCode(item.url) });
                showNotification('info', __('Please, select product options!'));

                return;
            }

            item.configurableVariantIndex = configurableVariantIndex;
        }

        this.setState({ isLoading: true });

        const products = this.getProducts();

        try {
            this.changeQuantityDebouncer.cancelDebounceAndExecuteImmediately();
            this.changeDescriptionDebouncer.cancelDebounceAndExecuteImmediately();
            await addProductToCart({ products });
            this.removeItem(id);
        } catch {
            this.setState({ isLoading: false }, this.redirectToProductPage);
        }
    }

    showNotification(...args) {
        const { showNotification } = this.props;
        this.setState({ isLoading: false });
        showNotification(...args);
    }

    async removeItem(noMessages = true, isRemoveOnly = false) {
        const { product: { wishlist: { id: item_id } }, removeFromWishlist, handleSelectIdChange } = this.props;

        if (!isSignedIn()) {
            return;
        }

        this.setState({ isLoading: true });

        handleSelectIdChange(item_id, isRemoveOnly);

        try {
            removeFromWishlist({ item_id, noMessages });
        } catch (e) {
            this.showNotification('error', __('Error cleaning wishlist'));
        }
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
