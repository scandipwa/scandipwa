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
import ContentWrapper from 'Component/ContentWrapper';
import ProductCard from 'Component/ProductCard';
import PropTypes from 'prop-types';
import { ItemsType } from 'Type/ProductList';
import './RecentlyViewedProducts.style';

export const RECENTLY_VIEWED_PRODUCTS = 'recentlyViewedProducts';
export const NUMBER_OF_RECENT_PRODUCTS = 6;

/**
 * RecentlyViewed products block
 * @class RecentlyViewedProducts
 */
export default class RecentlyViewedProducts extends PureComponent {
    static propTypes = {
        products: ItemsType.isRequired,
        label: PropTypes.string
    };

    static defaultProps = {
        label: ''
    };

    renderProducts(products) {
        if (!products.length) {
            return (
                <p block="RecentlyViewedProducts" elem="EmptyList">No recently viewed products.</p>
            );
        }

        return (
            <ul block="RecentlyViewedProducts" elem="List">
            { products.slice(0, NUMBER_OF_RECENT_PRODUCTS).map((product, i) => (
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
        const { label, products } = this.props;

        return (
            <ContentWrapper
              label="Recently viewed products"
              mix={ { block: 'RecentlyViewedProducts' } }
              wrapperMix={ { block: 'RecentlyViewedProducts', elem: 'Wrapper' } }
            >
                { label && <h4 block="RecentlyViewedProducts" elem="Label">{ label }</h4> }
                    { this.renderProducts(products) }
            </ContentWrapper>
        );
    }
}
