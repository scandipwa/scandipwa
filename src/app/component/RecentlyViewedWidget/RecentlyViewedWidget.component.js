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
import React from 'react';

import ProductCard from 'Component/ProductCard';
import { ItemsType } from 'Type/ProductList';

import './RecentlyViewedWidget.style';

/** @namespace Component/RecentlyViewedWidget/Component */
export class RecentlyViewedWidget extends PureComponent {
    static propTypes = {
        products: ItemsType.isRequired,
        pageSize: PropTypes.number
    };

    static defaultProps = {
        pageSize: 6
    };

    renderProducts(products) {
        const { pageSize } = this.props;

        return (
            <ul block="RecentlyViewedWidget" elem="Page">
                { products.slice(0, pageSize).map((product, i) => (
                    <ProductCard
                      selectedFilters={ product.selectedFilters }
                      product={ product }
                      // eslint-disable-next-line react/no-array-index-key
                      key={ `${product.id}_${i}` }
                    />
                )) }
            </ul>
        );
    }

    render() {
        const { products } = this.props;

        if (!products.length) {
            return null;
        }

        return (
            <div
              block="RecentlyViewedWidget"
            >
                <h3>{ __('Recently Viewed Products') }</h3>
                { this.renderProducts(products) }
            </div>
        );
    }
}

export default RecentlyViewedWidget;
