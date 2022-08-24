/* eslint-disable no-unreachable */
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

import { MouseEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ProductType } from 'Component/Product/Product.config';
import SwipeToDelete from 'Component/SwipeToDelete';
import { QuoteData } from 'Query/Cart.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { ReactElement, Url } from 'Type/Common.type';
import { encodeBase64 } from 'Util/Base64';
import { getMaxQuantity, getMinQuantity, getProductInStock } from 'Util/Product/Extract';
import {
    IndexedAttributeWithValue, IndexedProduct, IndexedVariant, StockCheckProduct
} from 'Util/Product/Product.type';
import { makeCancelable } from 'Util/Promise';
import { CancelablePromise } from 'Util/Promise/Promise.type';
import { RootState } from 'Util/Store/Store.type';
import { objectToUri } from 'Util/Url';

import CartItem from './CartItem.component';
import {
    CartItemComponentContainerPropKeys,
    CartItemComponentProps,
    CartItemContainerMapDispatchProps,
    CartItemContainerMapStateProps,
    CartItemContainerProps,
    CartItemContainerState
} from './CartItem.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/CartItem/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CartItemContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
    cartId: state.CartReducer.cartTotals?.id || ''
});

/** @namespace Component/CartItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CartItemContainerMapDispatchProps => ({
    addProduct: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    changeItemQty: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.changeItemQty(dispatch, options)
    ),
    removeProduct: (itemId) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeProductFromCart(dispatch, itemId)
    ),
    updateCrossSellProducts: (items) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateCrossSellProducts(items, dispatch)
    ),
    showNotification: (type, title, error) => dispatch(showNotification(type, title, error))
});

/** @namespace Component/CartItem/Container */
export class CartItemContainer extends PureComponent<CartItemContainerProps, CartItemContainerState> {
    static defaultProps: Partial<CartItemContainerProps> = {
        updateCrossSellsOnRemove: false,
        isCartOverlay: false,
        isEditing: false,
        cartId: '',
        onCartItemLoading: undefined,
        showLoader: true
    };

    state: CartItemContainerState = { isLoading: false };

    handlers: CancelablePromise[] = [];

    containerFunctions = {
        handleChangeQuantity: this.handleChangeQuantity.bind(this),
        handleRemoveItem: this.handleRemoveItem.bind(this),
        getCurrentProduct: this.getCurrentProduct.bind(this),
        getProductVariant: this.getProductVariant.bind(this)
    };

    __construct(props: CartItemContainerProps): void {
        super.__construct?.(props);

        this.setStateNotLoading = this.setStateNotLoading.bind(this);
        this.renderRightSideContent = this.renderRightSideContent.bind(this);
        this.handleRemoveItemOnSwipe = this.handleRemoveItemOnSwipe.bind(this);
    }

    componentDidMount(): void {
        this.setStateNotLoading();
    }

    componentWillUnmount(): void {
        this.notifyAboutLoadingStateChange(false);

        if (this.handlers.length) {
            [].forEach.call(this.handlers, (cancelablePromise: CancelablePromise) => cancelablePromise.cancel());
        }
    }

    productIsInStock(): boolean {
        const { item: { product } } = this.props;

        return getProductInStock(product as Partial<StockCheckProduct>);
    }

    /**
     * @returns {Product}
     */
    getCurrentProduct(): IndexedVariant | IndexedProduct | undefined {
        const { item: { product } } = this.props;
        const variantIndex = this._getVariantIndex();

        return variantIndex < 0
            ? product
            : product.variants?.[ variantIndex ];
    }

    setStateNotLoading(): void {
        this.notifyAboutLoadingStateChange(false);
        this.setState({ isLoading: false });
    }

    containerProps(): Pick<CartItemComponentProps, CartItemComponentContainerPropKeys> {
        const {
            item,
            currency_code,
            isEditing,
            isCartOverlay,
            isMobile,
            showLoader
        } = this.props;
        const { isLoading } = this.state;

        return {
            item,
            currency_code,
            isEditing,
            isCartOverlay,
            isMobile,
            isLoading,
            showLoader,
            linkTo: this._getProductLinkTo(),
            thumbnail: this._getProductThumbnail(),
            minSaleQuantity: getMinQuantity(this.getCurrentProduct() as IndexedProduct),
            maxSaleQuantity: getMaxQuantity(this.getCurrentProduct() as IndexedProduct),
            isProductInStock: this.productIsInStock(),
            optionsLabels: this.getConfigurableOptionsLabels(),
            isMobileLayout: this.getIsMobileLayout()
        };
    }

    /**
     * Handle item quantity change. Check that value is <1
     * @return {void}
     * @param quantity
     */
    handleChangeQuantity(quantity: number): void {
        this.setState({ isLoading: true }, () => {
            const { changeItemQty, item: { id, quantity: itemQuantity = 1 }, cartId } = this.props;

            if (quantity === itemQuantity) {
                this.setState({ isLoading: false });

                return;
            }

            this.hideLoaderAfterPromise(changeItemQty({
                uid: encodeBase64(String(id)),
                quantity,
                cartId
            }));
        });
        this.notifyAboutLoadingStateChange(true);
    }

    /**
     * @return {void}
     */
    handleRemoveItem(e: MouseEvent): void {
        this.handleRemoveItemOnSwipe(e);
        this.notifyAboutLoadingStateChange(true);
    }

    handleRemoveItemOnSwipe(e?: MouseEvent): void {
        if (e) {
            e.preventDefault();
        }

        this.setState({ isLoading: true }, () => {
            this.hideLoaderAfterPromise(this.removeProductAndUpdateCrossSell());
        });
    }

    getIsMobileLayout(): boolean {
        // "isMobileLayout" check is required to render mobile content in some additional cases
        // where screen width exceeds 810px (e.g. CartOverlay)
        const { isMobile, isCartOverlay } = this.props;

        return isMobile || isCartOverlay;
    }

    async removeProductAndUpdateCrossSell(): Promise<Partial<QuoteData> | null> {
        const {
            removeProduct,
            updateCrossSellProducts,
            updateCrossSellsOnRemove,
            item: { id }
        } = this.props;

        const result = await removeProduct(id);

        if (result && updateCrossSellsOnRemove) {
            await updateCrossSellProducts(result.items || []);
        }

        return result;
    }

    /**
     * @param {Promise}
     * @returns {cancelablePromise}
     */
    registerCancelablePromise(promise: Promise<unknown>): CancelablePromise {
        const cancelablePromise = makeCancelable(promise);

        this.handlers.push(cancelablePromise);

        return cancelablePromise;
    }

    /**
     * @param {Promise} promise
     * @returns {void}
     */
    hideLoaderAfterPromise(promise: Promise<unknown>): void {
        this.registerCancelablePromise(promise)
            .promise.then(this.setStateNotLoading, this.setStateNotLoading);
    }

    getProductVariant(): IndexedVariant {
        const {
            item: {
                product: {
                    variants = []
                }
            }
        } = this.props;

        return variants[ this._getVariantIndex() ];
    }

    /**
     * @returns {Int}
     */
    _getVariantIndex(): number {
        const {
            item: {
                sku: itemSku,
                product: { variants = [] } = {}
            }
        } = this.props;

        return variants.findIndex(({ sku }) => sku === itemSku || itemSku.includes(sku));
    }

    /**
     * Get link to product page
     * @param url_key Url to product
     * @return {{pathname: String, state Object}} Pathname and product state
     */
    _getProductLinkTo(): Url {
        const {
            item: {
                product,
                product: {
                    type_id,
                    configurable_options = {},
                    parent,
                    url = ''
                } = {}
            } = {}
        } = this.props;

        if (type_id !== ProductType.CONFIGURABLE) {
            return {
                pathname: url,
                state: { product }
            };
        }

        const variant = this.getProductVariant();

        if (!variant) {
            return { pathname: '' };
        }
        const { attributes } = variant;

        const parameters = Object.entries(attributes).reduce(
            (parameters, [code, { attribute_value }]) => {
                if (Object.keys(configurable_options).includes(code)) {
                    return { ...parameters, [ code ]: attribute_value };
                }

                return parameters;
            }, {}
        );

        const stateProduct = parent || product;

        return {
            pathname: url,
            state: { product: stateProduct },
            search: objectToUri(parameters)
        };
    }

    _getProductThumbnail(): string {
        const product = this.getCurrentProduct() || {} as IndexedVariant | IndexedProduct;
        const { thumbnail: { url: thumbnail } = {} } = product;

        return thumbnail || '';
    }

    getConfigurationOptionLabel([key, attribute]: [string, IndexedAttributeWithValue]): string | null {
        const {
            item: {
                product: {
                    configurable_options = {}
                }
            }
        } = this.props;

        const { attribute_code, attribute_value } = attribute;

        if (!Object.keys(configurable_options).includes(key) || attribute_value === null) {
            return null;
        }

        const {
            [ attribute_code ]: { // configurable option attribute
                attribute_options: {
                    [ attribute_value ]: { // attribute option value label
                        label
                    }
                }
            }
        } = configurable_options;

        return label;
    }

    getConfigurableOptionsLabels(): string[] {
        const {
            item: {
                configurable_options = [],
                product: {
                    variants
                } = {}
            } = {}
        } = this.props;

        if (!variants || !configurable_options) {
            return [];
        }

        return configurable_options.map(({ value_label }) => value_label);
    }

    notifyAboutLoadingStateChange(isLoading: boolean): void {
        const { onCartItemLoading } = this.props;

        if (onCartItemLoading) {
            onCartItemLoading(isLoading);
        }
    }

    renderRightSideContent(): ReactElement {
        const { handleRemoveItem } = this.containerFunctions;

        return (
            <button
              block="CartItem"
              elem="SwipeToDeleteRightSide"
              onClick={ handleRemoveItem }
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
              onAheadOfDragItemRemoveThreshold={ this.handleRemoveItemOnSwipe }
              isLoading={ isLoading }
            >
                <CartItem
                  { ...this.containerFunctions }
                  { ...this.containerProps() }
                />
            </SwipeToDelete>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemContainer);
