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
} from './RecentlyViewedWidget.type';

/** @namespace Component/RecentlyViewedWidget/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): RecentlyViewedWidgetContainerMapStateProps => ({
    recentProducts: state.RecentlyViewedProductsReducer.recentlyViewedProducts,
    isLoading: state.RecentlyViewedProductsReducer.isLoading,
    store: state.ConfigReducer.code,
});

/** @namespace Component/RecentlyViewedWidget/Container/mapDispatchToProps */
export const mapDispatchToProps = (): RecentlyViewedWidgetContainerMapDispatchProps => ({
    updateRecentViewedProductsInfo:
        (options) => RecentlyViewedProductsDispatcher.getRecentlyViewedProducts(options),
});

/** @namespace Component/RecentlyViewedWidget/Container */
export class RecentlyViewedWidgetContainer extends PureComponent<
RecentlyViewedWidgetContainerProps
> {
    static defaultProps: Partial<RecentlyViewedWidgetContainerProps> = {
        pageSize: 6,
    };

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
            store,
            recentProducts,
            pageSize,
            isLoading,
        } = this.props;

        const products = recentProducts[ store ] ?? [];

        return {
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
