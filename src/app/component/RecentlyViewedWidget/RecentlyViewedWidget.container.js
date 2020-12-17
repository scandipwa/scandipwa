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
    state = {
        siblingsHaveBrands: false,
        siblingsHavePriceBadge: false,
        siblingsHaveTierPrice: false,
        siblingsHaveConfigurableOptions: false
    };

    productCardFunctions = {
        setSiblingsHaveBrands: this.setSiblingsHaveBrands.bind(this),
        setSiblingsHavePriceBadge: this.setSiblingsHavePriceBadge.bind(this),
        setSiblingsHaveTierPrice: this.setSiblingsHaveTierPrice.bind(this),
        setSiblingsHaveConfigurableOptions: this.setSiblingsHaveConfigurableOptions.bind(this)
    };

    setSiblingsHaveBrands() {
        this.setState({ siblingsHaveBrands: true });
    }

    setSiblingsHavePriceBadge() {
        this.setState({ siblingsHavePriceBadge: true });
    }

    setSiblingsHaveTierPrice() {
        this.setState({ siblingsHaveTierPrice: true });
    }

    setSiblingsHaveConfigurableOptions() {
        this.setState({ siblingsHaveConfigurableOptions: true });
    }

    render() {
        const {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        } = this.state;

        const productCardProps = {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        };

        return (
            <RecentlyViewedWidget
              productCardProps={ productCardProps }
              productCardFunctions={ this.productCardFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyViewedWidgetContainer);
