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
import { Dispatch } from 'redux';

import ProductAlertsQuery from 'Query/ProductAlerts.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';

import ProductAlerts from './ProductAlerts.component';
import { ProductAlert } from './ProductAlerts.config';
import {
    ProductAlertsComponentContainerPropKeys,
    ProductAlertsComponentProps,
    ProductAlertsContainerFunctions,
    ProductAlertsContainerMapDispatchProps,
    ProductAlertsContainerMapStateProps,
    ProductAlertsContainerProps,
} from './ProductAlerts.type';

/** @namespace Component/ProductAlerts/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductAlertsContainerMapStateProps => ({
    isPriceAlertEnabled: state.ConfigReducer.product_alert_allow_price,
    isInStockAlertEnabled: state.ConfigReducer.product_alert_allow_stock,
    isSignedIn: state.MyAccountReducer.isSignedIn,
});

/** @namespace Component/ProductAlerts/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductAlertsContainerMapDispatchProps => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    showErrorNotification: (message) => dispatch(showNotification(NotificationType.ERROR, message)),
});

/** @namespace Component/ProductAlerts/Container */
export class ProductAlertsContainer<
P extends Readonly<ProductAlertsContainerProps> = Readonly<ProductAlertsContainerProps>,
S extends ProductAlertsContainerState = ProductAlertsContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<ProductAlertsContainerProps> = {
        isInStockAlertEnabled: false,
        isPriceAlertEnabled: false,
        stockStatus: null,
    };

    containerFunctions: ProductAlertsContainerFunctions = {
        handlePriceDropSubscribeAlertPriceDrop: this.handlePriceDropSubscribe.bind(this, ProductAlert.PRICE_DROP),
        handlePriceDropSubscribeAlertInStock: this.handlePriceDropSubscribe.bind(this, ProductAlert.IN_STOCK),
    };

    containerProps(): Pick<ProductAlertsComponentProps, ProductAlertsComponentContainerPropKeys> {
        const {
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            stockStatus,
        } = this.props;

        return {
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            stockStatus,
        };
    }

    async handlePriceDropSubscribe(type: string): Promise<void> {
        const {
            productId,
            showErrorNotification,
            showNotification,
            isSignedIn,
        } = this.props;

        if (!isSignedIn) {
            showNotification(NotificationType.INFO, __('Please sign in to subscribe for notification'));

            return;
        }

        const query = ProductAlertsQuery.getProductAlertSubscribeMutation(String(productId), type);

        try {
            const productAlertSubscribe = await fetchMutation(query);

            if (productAlertSubscribe) {
                showNotification(NotificationType.SUCCESS, __('You saved the alert subscription'));
            }
        } catch (error) {
            showErrorNotification(getErrorMessage(error as NetworkError));
        }
    }

    render(): ReactElement {
        return (
            <ProductAlerts
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAlertsContainer);
