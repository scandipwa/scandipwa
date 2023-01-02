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

import RecentlyViewedProductsDispatcher from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.dispatcher';
import RecentlyViewedProductsReducer from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.reducer';
import { ReactElement } from 'Type/Common.type';
import { withReducers } from 'Util/DynamicReducer';
import { RootState } from 'Util/Store/Store.type';

import RecentlyViewedWidget from './RecentlyViewedWidget.component';
import {
    RecentlyViewedWidgetComponentProps,
    RecentlyViewedWidgetContainerMapDispatchProps,
    RecentlyViewedWidgetContainerMapStateProps,
    RecentlyViewedWidgetContainerProps,
    RecentlyViewedWidgetContainerState,
} from './RecentlyViewedWidget.type';

/** @namespace Component/RecentlyViewedWidget/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): RecentlyViewedWidgetContainerMapStateProps => ({
    recentProducts: state.RecentlyViewedProductsReducer.recentlyViewedProducts,
    isLoading: state.RecentlyViewedProductsReducer.isLoading,
    store: state.ConfigReducer.code,
});

/** @namespace Component/RecentlyViewedWidget/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): RecentlyViewedWidgetContainerMapDispatchProps => ({
    updateRecentViewedProductsInfo:
        (options) => RecentlyViewedProductsDispatcher.handleData(dispatch, options),
});

/** @namespace Component/RecentlyViewedWidget/Container */
export class RecentlyViewedWidgetContainer<
P extends Readonly<RecentlyViewedWidgetContainerProps> = Readonly<RecentlyViewedWidgetContainerProps>,
S extends RecentlyViewedWidgetContainerState = RecentlyViewedWidgetContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<RecentlyViewedWidgetContainerProps> = {
        pageSize: 6,
    };

    state: S = {
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false,
    } as S;

    componentDidMount(): void {
        const {
            updateRecentViewedProductsInfo,
            recentProducts,
            store,
        } = this.props;

        if (Object.entries(recentProducts).length !== 0) {
            updateRecentViewedProductsInfo({ recentProducts, store });
        }
    }

    containerProps(): RecentlyViewedWidgetComponentProps {
        const {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions,
        } = this.state;

        const {
            store,
            recentProducts,
            pageSize,
            isLoading,
        } = this.props;

        const products = recentProducts[ store ] ?? [];

        return {
            productCardFunctions: {
                setSiblingsHaveBrands: () => this.setState({ siblingsHaveBrands: true }),
                setSiblingsHavePriceBadge: () => this.setState({ siblingsHavePriceBadge: true }),
                setSiblingsHaveTierPrice: () => this.setState({ siblingsHaveTierPrice: true }),
                setSiblingsHaveConfigurableOptions: () => this.setState({ siblingsHaveConfigurableOptions: true }),
            },
            productCardProps: {
                siblingsHaveBrands,
                siblingsHavePriceBadge,
                siblingsHaveTierPrice,
                siblingsHaveConfigurableOptions,
            },
            products,
            isLoading,
            pageSize,
        };
    }

    render(): ReactElement {
        return (
            <RecentlyViewedWidget
              { ...this.containerProps() }
            />
        );
    }
}

export default withReducers({
    RecentlyViewedProductsReducer,
})(connect(mapStateToProps, mapDispatchToProps)(RecentlyViewedWidgetContainer));
