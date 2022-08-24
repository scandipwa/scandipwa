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

import ProductListQuery from 'Query/ProductList.query';
import { ProductsQueryOutput } from 'Query/ProductList.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { getIndexedProducts } from 'Util/Product';
import { prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';

import NewProducts from './NewProducts.component';
import {
    NewProductsComponentProps,
    NewProductsContainerMapDispatchProps,
    NewProductsContainerMapStateProps,
    NewProductsContainerProps,
    NewProductsContainerState
} from './NewProducts.type';

/** @namespace Component/NewProducts/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NewProductsContainerMapStateProps => ({
    timezone: state.ConfigReducer.timezone
});

/** @namespace Component/NewProducts/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): NewProductsContainerMapDispatchProps => ({
    showNotification: (type, title, error) => dispatch(showNotification(type, title, error))
});

/** @namespace Component/NewProducts/Container */
export class NewProductsContainer extends PureComponent<NewProductsContainerProps, NewProductsContainerState> {
    static defaultProps: Partial<NewProductsContainerProps> = {
        category: '',
        productsCount: 10,
        cacheLifetime: 86400,
        productsPerPage: 6
    };

    state: NewProductsContainerState = {
        products: undefined,
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false
    };

    componentDidMount(): void {
        this.requestProducts();
    }

    componentDidUpdate(prevProps: NewProductsContainerProps): void {
        const {
            category,
            productsCount,
            cacheLifetime,
            timezone
        } = this.props;
        const {
            category: pCategory,
            productsCount: pProductsCount,
            cacheLifetime: pCacheLifetime,
            timezone: pTimezone
        } = prevProps;

        if (category !== pCategory
            || timezone !== pTimezone
            || productsCount !== pProductsCount
            || cacheLifetime !== pCacheLifetime) {
            this.requestProducts();
        }
    }

    containerProps(): NewProductsComponentProps {
        const { productsPerPage } = this.props;
        const {
            products = [],
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        } = this.state;

        return {
            productsPerPage,
            products,
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

    /**
     * Calculates date for request in server locale and with ttl error
     *
     * @returns {Date}
     * @memberof NewProducts
     */
    getRequestDate(): string {
        const { cacheLifetime, timezone: timeZone } = this.props;
        const milliInSeccond = 1000;

        const now = new Date();
        const serverNow = new Date(now.toLocaleString('en', { timeZone }));

        const serverNowTime = serverNow.getTime();
        const ttl = cacheLifetime * milliInSeccond;

        const requestTime = serverNowTime - (serverNowTime % ttl);
        const requestDate = new Date(requestTime);

        const timeOffset = 10;

        return requestDate.toISOString().slice(0, timeOffset);
    }

    requestProducts(): void {
        const {
            timezone,
            category: categoryUrlPath,
            productsCount: pageSize,
            cacheLifetime,
            showNotification
        } = this.props;

        if (!timezone) {
            return;
        }

        const newToDate = this.getRequestDate();

        const options = {
            args: {
                filter: {
                    categoryUrlPath,
                    newToDate
                },
                currentPage: 1,
                pageSize
            }
        };

        const query = [ProductListQuery.getQuery(options)];
<<<<<<< HEAD:packages/scandipwa/src/component/NewProducts/NewProducts.container.tsx
        executeGet<{ products: ProductsQueryOutput }>(prepareQuery(query), 'NewProducts', cacheLifetime)
=======

        executeGet(prepareQuery(query), 'NewProducts', cacheLifetime)
>>>>>>> scandipwa/master:packages/scandipwa/src/component/NewProducts/NewProducts.container.js
            .then(
                /** @namespace Component/NewProducts/Container/NewProductsContainer/requestProducts/then/catch/executeGet/then */
                ({ products: { items } }) => this.setState({ products: getIndexedProducts(items) })
            )
            .catch(
                /** @namespace Component/NewProducts/Container/NewProductsContainer/requestProducts/then/catch/showNotification */
                (e) => showNotification(NotificationType.ERROR, __('Error fetching NewProducts!'), e)
            );
    }

    render(): ReactElement {
        return (
            <NewProducts
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductsContainer);
