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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import RecentlyViewedProductsDispatcher from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.dispatcher';
import RecentlyViewedProductsReducer from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.reducer';
import { ItemsType } from 'Type/ProductList.type';
import { withReducers } from 'Util/DynamicReducer';

import RecentlyViewedWidget from './RecentlyViewedWidget.component';

/** @namespace Component/RecentlyViewedWidget/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    recentProducts: state.RecentlyViewedProductsReducer.recentlyViewedProducts,
    isLoading: state.RecentlyViewedProductsReducer.isLoading,
    store: state.ConfigReducer.code
});

/** @namespace Component/RecentlyViewedWidget/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateRecentViewedProductsInfo:
        (options) => RecentlyViewedProductsDispatcher.handleData(dispatch, options)
});

/** @namespace Component/RecentlyViewedWidget/Container */
export class RecentlyViewedWidgetContainer extends PureComponent {
    static propTypes = {
        pageSize: PropTypes.number,
        updateRecentViewedProductsInfo: PropTypes.func.isRequired,
        recentProducts: PropTypes.objectOf(ItemsType).isRequired,
        isLoading: PropTypes.bool.isRequired,
        store: PropTypes.string.isRequired
    };

    static defaultProps = {
        pageSize: 6
    };

    state = {
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false
    };

    componentDidMount() {
        const {
            updateRecentViewedProductsInfo,
            recentProducts,
            store
        } = this.props;

        if (Object.entries(recentProducts).length !== 0) {
            updateRecentViewedProductsInfo({ recentProducts, store });
        }
    }

    containerProps() {
        const {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        } = this.state;

        const {
            store,
            recentProducts,
            pageSize,
            isLoading
        } = this.props;

        const products = recentProducts[store] ?? [];

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
            },
            products,
            isLoading,
            pageSize
        };
    }

    render() {
        return (
            <RecentlyViewedWidget
              { ...this.containerProps() }
            />
        );
    }
}

export default withReducers({
    RecentlyViewedProductsReducer
})(connect(mapStateToProps, mapDispatchToProps)(RecentlyViewedWidgetContainer));
