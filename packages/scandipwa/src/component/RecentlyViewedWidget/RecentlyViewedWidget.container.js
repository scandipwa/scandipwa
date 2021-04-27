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

import { ItemsType } from 'Type/ProductList';

import RecentlyViewedWidget from './RecentlyViewedWidget.component';

/** @namespace Component/RecentlyViewedWidget/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    recentProducts: state.RecentlyViewedProductsReducer.recentlyViewedProducts,
    store: state.ConfigReducer.code
});

/** @namespace Component/Slider/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

/** @namespace Component/RecentlyViewedWidget/Container */
export class RecentlyViewedWidgetContainer extends PureComponent {
    static propTypes = {
        recentProducts: PropTypes.objectOf(ItemsType).isRequired,
        store: PropTypes.string.isRequired
    };

    state = {
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false
    };

    containerProps() {
        const {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        } = this.state;

        const {
            store,
            recentProducts
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
            products
        };
    }

    render() {
        return (
            <RecentlyViewedWidget
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyViewedWidgetContainer);
