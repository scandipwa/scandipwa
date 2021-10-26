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
import React, { Component } from 'react';

import ProductCard from 'Component/ProductCard';
import { ItemsType, ProductCardPropsType } from 'Type/ProductList.type';

import './RecentlyViewedWidget.style';

/** @namespace Component/RecentlyViewedWidget/Component */
export class RecentlyViewedWidget extends Component {
    static propTypes = {
        pageSize: PropTypes.number.isRequired,
        products: ItemsType.isRequired,
        productCardProps: ProductCardPropsType.isRequired,
        productCardFunctions: PropTypes.objectOf(PropTypes.func).isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    renderProductCard = this.renderProductCard.bind(this);

    shouldComponentUpdate(nextProps) {
        const { products, pageSize } = this.props;
        const {
            products: nextProducts,
            pageSize: nextPageSize
        } = nextProps;

        return products !== nextProducts || pageSize !== nextPageSize;
    }

    renderProducts(products) {
        const { pageSize } = this.props;

        return (
            <ul block="RecentlyViewedWidget" elem="Page">
                { products.slice(0, pageSize).map((product) => this.renderProductCard(product)) }
            </ul>
        );
    }

    renderProductCard(product) {
        const {
            productCardProps: {
                siblingsHaveBrands,
                siblingsHavePriceBadge,
                siblingsHaveTierPrice,
                siblingsHaveConfigurableOptions
            },
            productCardFunctions: {
                setSiblingsHaveBrands,
                setSiblingsHavePriceBadge,
                setSiblingsHaveTierPrice,
                setSiblingsHaveConfigurableOptions
            },
            isLoading
        } = this.props;
        const { id, selectedFilters } = product;

        return (
            <ProductCard
              selectedFilters={ selectedFilters }
              product={ product }
              key={ id }
              isPreview={ isLoading }
              siblingsHaveBrands={ siblingsHaveBrands }
              siblingsHavePriceBadge={ siblingsHavePriceBadge }
              siblingsHaveTierPrice={ siblingsHaveTierPrice }
              siblingsHaveConfigurableOptions={ siblingsHaveConfigurableOptions }
              setSiblingsHaveBrands={ setSiblingsHaveBrands }
              setSiblingsHavePriceBadge={ setSiblingsHavePriceBadge }
              setSiblingsHaveTierPrice={ setSiblingsHaveTierPrice }
              setSiblingsHaveConfigurableOptions={ setSiblingsHaveConfigurableOptions }
            />
        );
    }

    render() {
        const { products = [] } = this.props;

        if (!products.length) {
            return null;
        }

        return (
            <div
              block="RecentlyViewedWidget"
            >
                <h2>{ __('Recently Viewed Products') }</h2>
                { this.renderProducts(products) }
            </div>
        );
    }
}

export default RecentlyViewedWidget;
