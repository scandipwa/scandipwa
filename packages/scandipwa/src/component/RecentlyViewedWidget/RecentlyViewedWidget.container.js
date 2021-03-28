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

import {
    RECENTLY_VIEWED_PRODUCTS
} from 'Component/RecentlyViewedWidget/RecentlyViewedWidget.config';
import ProductListQuery from 'Query/ProductList.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { ItemsType } from 'Type/ProductList';
import BrowserDatabase from 'Util/BrowserDatabase';
import { fetchQuery } from 'Util/Request';

import RecentlyViewedWidget from './RecentlyViewedWidget.component';

/** @namespace Component/RecentlyViewedWidget/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    products: state.RecentlyViewedProductsReducer.recentlyViewedProducts
});

/** @namespace Component/Slider/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

/** @namespace Component/RecentlyViewedWidget/Container */
export class RecentlyViewedWidgetContainer extends PureComponent {
    static propTypes = {
        products: ItemsType.isRequired
    };

    state = {
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false
    };

    componentDidMount() {
        this.refreshProducts();
    }

    componentDidUpdate(prevProps) {
        const {
            products
        } = this.props;

        const {
            products: oldProducts
        } = prevProps;

        if (products !== oldProducts) {
            this.refreshProducts();
        }
    }

    refreshProducts() {
        const { products } = this.props;
        const skuArray = products.map(({ sku }) => sku);

        if (skuArray.length) {
            const options = {
                args: {
                    filter: {
                        productsSkuArray: skuArray
                    }
                }
            };

            fetchQuery(ProductListQuery.getQuery(options)).then(
                /** @namespace Component/RecentlyViewedWidget/Container/refreshProductsFetchQueryThen */
                (data) => {
                    // Replacing only price range
                    const refreshedProducts = products.map((oldProduct) => ({
                        ...oldProduct,
                        price_range: data.products.items.find(
                            (newProduct) => newProduct.sku === oldProduct.sku
                        ).price_range
                    }));

                    BrowserDatabase.setItem(refreshedProducts, RECENTLY_VIEWED_PRODUCTS);
                    this.setState({ products: refreshedProducts });
                },
                /** @namespace Component/RecentlyViewedWidget/Container/refreshProductsFetchQueryError */
                (error) => {
                    showNotification('error', __('Error fetching Recently viewed products!'), error);
                }
            );
        }
    }

    containerProps() {
        const {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        } = this.state;

        return {
            productCardFunctions: {
                setSiblingsHaveBrands: () => this.setState({ siblingsHaveBrands: true }),
                setSiblingsHavePriceBadge: () => this.setState({ siblingsHavePriceBadge: true }),
                setSiblingsHaveTierPrice: () => this.setState({ siblingsHaveTierPrice: true }),
                setSiblingsHaveConfigurableOptions: () => this.setState({ siblingsHaveConfigurableOptions: true })
            },
            productCardProps: {
                siblingsHaveBrands,
                siblingsHavePriceBadge,
                siblingsHaveTierPrice,
                siblingsHaveConfigurableOptions
            }
        };
    }

    render() {
        return (
            <RecentlyViewedWidget
              { ...this.props }
              { ...this.state }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyViewedWidgetContainer);
