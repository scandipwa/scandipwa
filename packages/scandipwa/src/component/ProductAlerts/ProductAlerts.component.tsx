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

import { ReactElement } from 'Type/Common.type';
import { GQLProductStockStatus } from 'Type/Graphql.type';

import { ProductAlertsComponentProps } from './ProductAlerts.type';

import './ProductAlerts.style';

/** @namespace Component/ProductAlerts/Component */
export class ProductAlerts extends PureComponent<ProductAlertsComponentProps> {
    static defaultProps: Partial<ProductAlertsComponentProps> = {
        isInStockAlertEnabled: false,
        isPriceAlertEnabled: false,
        stockStatus: null
    };

    renderPriceDropSubscribeButton(): ReactElement {
        const { handlePriceDropSubscribeAlertPriceDrop, isPriceAlertEnabled } = this.props;

        if (!isPriceAlertEnabled) {
            return null;
        }

        return (
            <button
              block="ProductAlerts"
              elem="PriceDrop"
              onClick={ handlePriceDropSubscribeAlertPriceDrop }
            >
                { __('Notify me when the price drops') }
            </button>
        );
    }

    renderInStockSubscribeButton(): ReactElement {
        const {
            handlePriceDropSubscribeAlertInStock,
            isInStockAlertEnabled,
            stockStatus
        } = this.props;

        if (!isInStockAlertEnabled) {
            return null;
        }

        if (stockStatus === GQLProductStockStatus.IN_STOCK || !stockStatus) {
            return null;
        }

        return (
            <button
              block="ProductAlerts"
              elem="InStock"
              onClick={ handlePriceDropSubscribeAlertInStock }
            >
                { __('Notify me when this product is in stock') }
            </button>
        );
    }

    render(): ReactElement {
        return (
            <div
              block="ProductAlerts"
              elem="Wrapper"
            >
                { this.renderPriceDropSubscribeButton() }
                { this.renderInStockSubscribeButton() }
            </div>
        );
    }
}

export default ProductAlerts;
