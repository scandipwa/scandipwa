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
import ProductListQuery from 'Query/ProductList.query';
import { GroupedProductItem } from 'Query/ProductList.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement, Url } from 'Type/Common.type';
import history from 'Util/History';
import { ADD_TO_CART } from 'Util/Product';
import { IndexedProduct, ProductTransformData } from 'Util/Product/Product.type';
import { magentoProductTransform } from 'Util/Product/Transform';
import { fetchQuery } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import ProductCompareItem from './ProductCompareItem.component';
import {
    ProductCompareItemComponentContainerPropKeys,
    ProductCompareItemComponentProps,
    ProductCompareItemContainerFunctions,
    ProductCompareItemContainerMapDispatchProps,
    ProductCompareItemContainerMapStateProps,
    ProductCompareItemContainerProps,
    ProductCompareItemContainerState,
} from './ProductCompareItem.type';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);
export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);
export const ProductDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Product/Product.dispatcher'
);

/** @namespace Component/ProductCompareItem/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductCompareItemContainerMapStateProps => ({
    device: state.ConfigReducer.device,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active,
});

/** @namespace Component/ProductCompareItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductCompareItemContainerMapDispatchProps => ({
    removeComparedProduct: (productId) => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeComparedProduct(productId, dispatch),
    ),
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options),
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
});

/** @namespace Component/ProductCompareItem/Container */
export class ProductCompareItemContainer extends PureComponent<
ProductCompareItemContainerProps,
ProductCompareItemContainerState
> {
    state: ProductCompareItemContainerState = {
        isLoading: false,
        overrideAddToCartBtnBehavior: false,
    };

    containerFunctions: ProductCompareItemContainerFunctions = {
        removeComparedProduct: this.removeComparedProduct.bind(this),
        getGroupedProductQuantity: this.getGroupedProductQuantity.bind(this),
        getProductOptionsData: this.getProductOptionsData.bind(this),
        overriddenAddToCartBtnHandler: this.overriddenAddToCartBtnHandler.bind(this),
        addItemToCart: this.addItemToCart.bind(this),
    };

    componentDidMount(): void {
        this.getOverrideAddToCartBtnBehavior();
    }

    containerProps(): Pick<ProductCompareItemComponentProps, ProductCompareItemComponentContainerPropKeys> {
        const { product, isInStock, isWishlistEnabled } = this.props;
        const { isLoading, overrideAddToCartBtnBehavior } = this.state;

        return {
            product,
            isLoading,
            imgUrl: this.getProductImage(),
            overrideAddToCartBtnBehavior,
            linkTo: this.getLinkTo(),
            isInStock,
            isWishlistEnabled,
        };
    }

    async removeComparedProduct(): Promise<void> {
        const {
            product: { id } = {},
            removeComparedProduct,
        } = this.props;

        this.setState({ isLoading: true });
        await removeComparedProduct(String(id));
    }

    getGroupedProductQuantity(): Record<number, number> {
        const { product: { items } = {} } = this.props;

        if (!items) {
            return {};
        }

        return (items as GroupedProductItem[]).reduce((result, item) => {
            const { product: { id = 0 } = {} } = item;

            Object.assign(result, { [ id ]: 1 });

            return result;
        }, {});
    }

    getProductOptionsData(): { requiredOptions: Array<number | null> } {
        const { product: { options } } = this.props;

        if (!options) {
            return { requiredOptions: [] };
        }

        return {
            requiredOptions: (options as unknown as Array<{
                option_id: number;
                required: boolean;
            }>)
                .map(({ option_id, required }) => (required ? option_id : null))
                .filter((item) => !!item),
        };
    }

    getProductImage(): string {
        const {
            product: {
                thumbnail,
                small_image,
            } = {},
            device: {
                isMobile,
            } = {},
        } = this.props;

        if (isMobile) {
            return small_image?.url || '';
        }

        return thumbnail?.url || '';
    }

    getLinkTo(): Url {
        const { product: { url }, product } = this.props;

        return {
            pathname: url,
            state: { product },
        };
    }

    getOverrideAddToCartBtnBehavior(): void {
        const { product: { type_id, id: productID } } = this.props;
        const types: string[] = [ProductType.BUNDLE, ProductType.CONFIGURABLE, ProductType.GROUPED];

        const options = {
            isSingleProduct: true,
            args: {
                filter: { productID },
            },
        };

        fetchQuery(ProductListQuery.getQuery(options)).then(
            /** @namespace Component/ProductCompareItem/Container/ProductCompareItemContainer/getOverrideAddToCartBtnBehavior/fetchQuery/then */
            ({ products: { items = [] } }) => {
                const hasRequiredOptions = items.some(({ options = [] }) => options?.some(({
                    required = false,
                }) => required));

                const isLinksRequired = items.some(({
                    links_purchased_separately = 0,
                }) => links_purchased_separately === 1);

                this.setState({
                    overrideAddToCartBtnBehavior: !!(types.indexOf(type_id) !== -1)
                        || hasRequiredOptions
                        || isLinksRequired,
                });
            },
        );
    }

    overriddenAddToCartBtnHandler(): void {
        const { showNotification } = this.props;

        showNotification(NotificationType.INFO, __('You need to choose options for your item.'));
    }

    redirectToProductPage(): void {
        const { product: { url } } = this.props;

        history.push({ pathname: appendWithStoreCode(url) });
    }

    getProducts(): ProductTransformData[] {
        const {
            product: {
                stock_item: {
                    min_sale_qty: quantity = 1,
                } = {},
            },
            product: item,
        } = this.props;

        return magentoProductTransform(ADD_TO_CART, item as unknown as IndexedProduct, quantity);
    }

    async addItemToCart(): Promise<void> {
        const {
            addProductToCart,
        } = this.props;

        this.setState({ isLoading: true });

        const products = this.getProducts();

        try {
            await addProductToCart({ products });
            this.setState({ isLoading: false });
        } catch {
            this.setState({ isLoading: false }, this.redirectToProductPage);
        }
    }

    render(): ReactElement {
        return (
            <ProductCompareItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareItemContainer);
