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

import ProductAlertsQuery from 'Query/ProductAlerts.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { StockStatusType } from 'Type/StockStatus.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';

import ProductAlerts from './ProductAlerts.component';
import { PRODUCT_ALERT_IN_STOCK, PRODUCT_ALERT_PRICE_DROP } from './ProductAlerts.config';

/** @namespace Component/ProductAlerts/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isPriceAlertEnabled: state.ConfigReducer.product_alert_allow_price,
    isInStockAlertEnabled: state.ConfigReducer.product_alert_allow_stock,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace Component/ProductAlerts/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Component/ProductAlerts/Container */
export class ProductAlertsContainer extends PureComponent {
    static propTypes = {
        isSignedIn: PropTypes.bool.isRequired,
        productId: PropTypes.number.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        isInStockAlertEnabled: PropTypes.bool,
        isPriceAlertEnabled: PropTypes.bool,
        stockStatus: StockStatusType
    };

    static defaultProps = {
        isInStockAlertEnabled: false,
        isPriceAlertEnabled: false,
        stockStatus: null
    };

    containerFunctions = {
        handlePriceDropSubscribeAlertPriceDrop: this.handlePriceDropSubscribe.bind(this, PRODUCT_ALERT_PRICE_DROP),
        handlePriceDropSubscribeAlertInStock: this.handlePriceDropSubscribe.bind(this, PRODUCT_ALERT_IN_STOCK)
    };

    containerProps() {
        const {
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            stockStatus
        } = this.props;

        return {
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            stockStatus
        };
    }

    async handlePriceDropSubscribe(type) {
        const {
            productId,
            showErrorNotification,
            showNotification,
            isSignedIn
        } = this.props;

        if (!isSignedIn) {
            showNotification('info', __('Please sign in to subscribe for notification'));
            return;
        }

        const query = ProductAlertsQuery.getProductAlertSubscribeMutation(productId, type);

        try {
            const productAlertSubscribe = await fetchMutation(query);

            if (productAlertSubscribe) {
                showNotification('success', __('You saved the alert subscription'));
            }
        } catch (error) {
            showErrorNotification(getErrorMessage(error));
        }
    }

    render() {
        return (
            <ProductAlerts
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAlertsContainer);
