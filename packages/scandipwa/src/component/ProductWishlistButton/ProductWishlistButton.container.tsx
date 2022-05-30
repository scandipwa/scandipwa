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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { IndexedWishlistProduct } from 'Util/Product/Product.type';
import { RootState } from 'Util/Store/Store.type';

import ProductWishlistButton from './ProductWishlistButton.component';
import {
    ProductWishlistButtonComponentContainerPropKeys,
    ProductWishlistButtonComponentProps,
    ProductWishlistButtonContainerMapDispatchProps,
    ProductWishlistButtonContainerMapStateProps,
    ProductWishlistButtonContainerProps,
    ProductWishlistButtonContainerState
} from './ProductWishlistButton.type';

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

/** @namespace Component/ProductWishlistButton/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductWishlistButtonContainerMapStateProps => ({
    productsInWishlist: state.WishlistReducer.productsInWishlist,
    isAddingWishlistItem: state.WishlistReducer.isLoading,
    // !FIXME: state.WishlistReducer.id doesn't exist. wishilistId is '0' by default. This must be fixed!
    // wishlistId: state.WishlistReducer.id
    wishlistId: '0'
});

/** @namespace Component/ProductWishlistButton/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductWishlistButtonContainerMapDispatchProps => ({
    addProductToWishlist: (wishlistItem) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addItemToWishlist(dispatch, wishlistItem)
    ),
    removeProductFromWishlist: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeItemFromWishlist(dispatch, options)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/ProductWishlistButton/Container */
export class ProductWishlistButtonContainer extends PureComponent<
ProductWishlistButtonContainerProps,
ProductWishlistButtonContainerState
> {
    static defaultProps = {
        mix: {}
    };

    state: ProductWishlistButtonContainerState = {
        isWishlistButtonLoading: false,
        isWishListToggle: false
    };

    containerFunctions = {
        addToWishlist: this.toggleProductInWishlist.bind(this, true),
        removeFromWishlist: this.toggleProductInWishlist.bind(this, false)
    };

    componentDidUpdate(prevProps: ProductWishlistButtonContainerProps): void {
        const { isAddingWishlistItem: isPrevAddingWishlistItem } = prevProps;
        const { isAddingWishlistItem } = this.props;

        if (isPrevAddingWishlistItem && !isAddingWishlistItem) {
            this.setWishlistButtonLoading(false);
        }
    }

    containerProps(): Pick<
    ProductWishlistButtonComponentProps,
    ProductWishlistButtonComponentContainerPropKeys
    > {
        const { magentoProduct, mix } = this.props;

        return {
            mix,
            magentoProduct,
            isDisabled: this.isDisabled(),
            isInWishlist: this.isInWishlist(),
            isSignedIn: isSignedIn()
        };
    }

    setWishlistButtonLoading(isLoading: boolean): void {
        return this.setState({ isWishlistButtonLoading: isLoading });
    }

    async toggleProductInWishlist(add = true): Promise<void> {
        const {
            magentoProduct,
            magentoProduct: [{ sku }] = [],
            showNotification,
            addProductToWishlist,
            removeProductFromWishlist,
            wishlistId
        } = this.props;

        const {
            isWishListToggle
        } = this.state;

        if (!isSignedIn()) {
            return showNotification(
                NotificationType.INFO,
                __('You must login or register to add items to your wishlist.')
            );
        }

        this.setWishlistButtonLoading(true);

        if (isWishListToggle) {
            return undefined;
        }

        this.setState({ isWishListToggle: true });

        if (add) {
            await addProductToWishlist({
                items: magentoProduct,
                wishlistId
            });

            this.setState({ isWishListToggle: false });

            return undefined;
        }

        const wishlistItem = this.getWishlistItem(sku);

        if (!wishlistItem) {
            this.setState({ isWishListToggle: false });

            return undefined;
        }

        const {
            wishlist: {
                id: itemId
            } = {}
        } = wishlistItem;

        this.setState({ isWishListToggle: false });

        return removeProductFromWishlist({ item_id: String(itemId) });
    }

    isDisabled(): boolean {
        const { isAddingWishlistItem } = this.props;
        return isAddingWishlistItem || !isSignedIn();
    }

    getWishlistItem(sku: string): IndexedWishlistProduct | undefined {
        const { productsInWishlist } = this.props;

        if (!productsInWishlist) {
            return undefined;
        }

        // TODO: After new graphql will need to check by options
        return Object.values(productsInWishlist).find(
            ({ sku: wishlistSku }) => sku === wishlistSku
        );
    }

    isInWishlist(): boolean {
        const { magentoProduct = [] } = this.props;
        const [{ sku: productSku }] = magentoProduct;

        if (!productSku) {
            return false;
        }

        return !!this.getWishlistItem(productSku);
    }

    render(): ReactElement {
        const { isWishlistButtonLoading } = this.state;

        return (
            <ProductWishlistButton
              isLoading={ isWishlistButtonLoading }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWishlistButtonContainer);
