/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Component } from 'react';

import ProductCard from 'Component/ProductCard';
import { RecentlyViewedProductItem } from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.type';
import { ReactElement } from 'Type/Common.type';

import { RecentlyViewedWidgetComponentProps } from './RecentlyViewedWidget.type';

import './RecentlyViewedWidget.style';

/** @namespace Component/RecentlyViewedWidget/Component */
export class RecentlyViewedWidgetComponent extends Component<RecentlyViewedWidgetComponentProps> {
    __construct(props: RecentlyViewedWidgetComponentProps): void {
        super.__construct?.(props);

        this.renderProductCard = this.renderProductCard.bind(this);
    }

    shouldComponentUpdate(nextProps: RecentlyViewedWidgetComponentProps): boolean {
        const { products, pageSize } = this.props;
        const {
            products: nextProducts,
            pageSize: nextPageSize,
        } = nextProps;

        return products !== nextProducts || pageSize !== nextPageSize;
    }

    renderProducts(products: RecentlyViewedProductItem[]): ReactElement {
        const { pageSize } = this.props;

        return (
            <ul block="RecentlyViewedWidget" elem="Page">
                { products.slice(0, pageSize).map((product) => this.renderProductCard(product)) }
            </ul>
        );
    }

    renderProductCard(product: RecentlyViewedProductItem): ReactElement {
        const {
            id,
            // !FIXME: Possible obsolete code. selectedFilters is always undefined and doesn't exist in type.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            selectedFilters,
        } = product;

        return (
            <ProductCard
              selectedFilters={ selectedFilters }
              product={ product }
              key={ id }
            />
        );
    }

    render(): ReactElement {
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

export default RecentlyViewedWidgetComponent;
