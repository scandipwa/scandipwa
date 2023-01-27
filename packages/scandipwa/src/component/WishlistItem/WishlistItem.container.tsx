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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ProductType } from 'Component/Product/Product.config';
import SwipeToDelete from 'Component/SwipeToDelete';
import CartDispatcher from 'Store/Cart/Cart.dispatcher';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import WishlistDispatcher from 'Store/Wishlist/Wishlist.dispatcher';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { ADD_TO_CART } from 'Util/Product';
import { getMaxQuantity, getMinQuantity, getProductInStock } from 'Util/Product/Extract';
import { IndexedVariant, ProductTransformData, StockCheckProduct } from 'Util/Product/Product.type';
import { getSelectedOptions, magentoProductTransform } from 'Util/Product/Transform';
import { Debouncer } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import WishlistItem from './WishlistItem.component';
import { UPDATE_WISHLIST_FREQUENCY } from './WishlistItem.config';
import {
    WishlistItemComponentContainerPropKeys,
    WishlistItemComponentProps,
    WishlistItemContainerFunctions,
    WishlistItemContainerMapDispatchProps,
    WishlistItemContainerMapStateProps,
    WishlistItemContainerProps,
    WishlistItemContainerState,
} from './WishlistItem.type';

/** @namespace Component/WishlistItem/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): WishlistItemContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
    // wishlistId: state.WishlistReducer.id
});

/** @namespace Component/WishlistItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): WishlistItemContainerMapDispatchProps => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    addProductToCart: (options) => CartDispatcher.addProductToCart(dispatch, options),
    updateWishlistItem: (options) => WishlistDispatcher.updateWishlistItem(dispatch, options),
    removeFromWishlist: (options) => WishlistDispatcher.removeItemFromWishlist(dispatch, options),
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
});

/** @namespace Component/WishlistItem/Container */
export class WishlistItemContainer<
P extends WishlistItemContainerProps = WishlistItemContainerProps,
S extends WishlistItemContainerState = WishlistItemContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<WishlistItemContainerProps> = {
        isRemoving: false,
        setIsQtyUpdateInProgress: noopFn,
        wishlistId: '0',
    };

    containerFunctions: WishlistItemContainerFunctions = {
        addToCart: this.addItemToCart.bind(this),
        removeItem: this.removeItem.bind(this, false, true),
        redirectToProductPage: this.redirectToProductPage.bind(this),
        setQuantity: this.setQuantity.bind(this),
    };

    changeQuantityDebouncer = new Debouncer();

    changeDescriptionDebouncer = new Debouncer();

    changeDescription = this.changeDescriptionDebouncer.startDebounce((description: string) => {
        const { wishlistId, product: { wishlist: { id: item_id } = {} }, updateWishlistItem } = this.props;

        if (!isSignedIn() || !item_id) {
            return;
        }

        updateWishlistItem({
            wishlistId,
            wishlistItems: [{
                wishlist_item_id: item_id,
                description,
            }],
        });
    }, UPDATE_WISHLIST_FREQUENCY);

    changeQuantity = this.changeQuantityDebouncer.startDebounce(async (quantity: number) => {
        const {
            wishlistId,
            product: {
                wishlist: {
                    id: item_id,
                } = {},
            },
            updateWishlistItem,
            setIsQtyUpdateInProgress,
        } = this.props;

        if (!isSignedIn() || !item_id) {
            return;
        }

        await updateWishlistItem({
            wishlistId,
            wishlistItems: [{
                wishlist_item_id: item_id,
                quantity,
            }],
        });

        setIsQtyUpdateInProgress(false);
    }, UPDATE_WISHLIST_FREQUENCY);

    __construct(props: WishlistItemContainerProps): void {
        super.__construct?.(props);

        this.state = {
            isLoading: false,
            currentQty: this.getQuantity(),
        } as S;

        this.renderRightSideContent = this.renderRightSideContent.bind(this);
        this.getAttributes = this.getAttributes.bind(this);
    }

    containerProps(): Pick<WishlistItemComponentProps, WishlistItemComponentContainerPropKeys> {
        const {
            handleSelectIdChange,
            isEditingActive,
            isMobile,
            isRemoving,
            product,
        } = this.props;
        const { isLoading } = this.state;

        return {
            inStock: this.productIsInStock(),
            changeQuantity: this.changeQuantity,
            changeDescription: this.changeDescription,
            minSaleQuantity: getMinQuantity(product),
            maxSaleQuantity: getMaxQuantity(product),
            attributes: this.getAttributes(),
            isLoading,
            handleSelectIdChange,
            isEditingActive,
            isMobile,
            isRemoving,
            product,
        };
    }

    productIsInStock(): boolean {
        const { product } = this.props;

        return getProductInStock(product as Partial<StockCheckProduct>);
    }

    setQuantity(quantity: number): void {
        const { setIsQtyUpdateInProgress } = this.props;

        this.setState({ currentQty: quantity });

        setIsQtyUpdateInProgress(true);
    }

    getConfigurableVariantIndex(sku: string, variants: IndexedVariant[]): string | undefined {
        return Object.keys(variants).find((i) => variants[ Number(i) ].sku === sku);
    }

    getAttributes(): string[] {
        const { product: { variants, configurable_options = {}, wishlist: { sku: wishlistSku } = {} } } = this.props;

        const { attributes = [] } = variants?.find(({ sku }) => sku === wishlistSku) || {};

        return attributes ? Object.values(attributes).reduce((
            acc: string[],
            { attribute_code, attribute_value },
        ) => {
            const {
                attribute_options: {
                    [ attribute_value ]: {
                        value = '',
                        label = '',
                    } = {},
                } = {},
            } = configurable_options[ attribute_code ] || {};

            if (value === attribute_value) {
                acc.push(label);

                return acc;
            }

            return acc;
        }, []) : [];
    }

    getProducts(): ProductTransformData[] {
        const {
            product: {
                wishlist: {
                    buy_request,
                } = {},
            },
            product: item,
        } = this.props;

        const { currentQty } = this.state;

        const selectedOptions = getSelectedOptions(buy_request as string);

        // take input value in case item in wishlist hasn't been updated yet (if you change qty and click "Add to cart" immediately)
        const quantity = currentQty || this.getQuantity();

        return magentoProductTransform(ADD_TO_CART, item, quantity, [], selectedOptions);
    }

    getQuantity(): number {
        const {
            product: {
                type_id: typeId,
                wishlist: {
                    quantity = 0,
                    buy_request: buyRequest,
                } = {},
            },
        } = this.props;

        if (typeId !== ProductType.GROUPED || !buyRequest) {
            return quantity;
        }

        const { super_group: superGroup = {} } = JSON.parse(buyRequest);

        return superGroup;
    }

    async addItemToCart(): Promise<void> {
        const {
            product: item,
            addProductToCart,
            showNotification,
        } = this.props;

        const {
            type_id,
            variants = [],
            url = '',
            wishlist: {
                id,
                sku = '',
            } = {},
        } = item;

        if (!isSignedIn()) {
            return;
        }

        if (type_id === ProductType.CONFIGURABLE) {
            const configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);

            if (!configurableVariantIndex) {
                history.push({ pathname: appendWithStoreCode(url) });
                showNotification(NotificationType.INFO, __('Please, select product options!'));

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
            this.removeItem(!!id);
        } catch {
            this.setState({ isLoading: false });
            history.push({ pathname: appendWithStoreCode(url) });
        }
    }

    showNotification(type: NotificationType, message: string): void {
        const { showNotification } = this.props;

        this.setState({ isLoading: false });
        showNotification(type, message);
    }

    async removeItem(noMessages = true, isRemoveOnly = false): Promise<void> {
        const { product: { wishlist: { id: item_id } = {} }, removeFromWishlist, handleSelectIdChange } = this.props;

        if (!isSignedIn() || !item_id) {
            return;
        }

        this.setState({ isLoading: true });

        handleSelectIdChange(item_id, isRemoveOnly);

        try {
            removeFromWishlist({ item_id, noMessages });
        } catch (e) {
            this.showNotification(NotificationType.ERROR, __('Error cleaning wishlist'));
        }
    }

    redirectToProductPage(): void {
        const { product: { url = '' } } = this.props;

        history.push({ pathname: appendWithStoreCode(url) });
    }

    renderRightSideContent(): ReactElement {
        const { removeItem } = this.containerFunctions;

        return (
            <button
              block="WishlistItem"
              elem="SwipeToDeleteRightSide"
              onClick={ removeItem }
              aria-label={ __('Remove') }
            >
                { __('Delete') }
            </button>
        );
    }

    render(): ReactElement {
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
