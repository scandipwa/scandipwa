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

import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import ProductReviews from './ProductReviews.component';
import {
    ProductReviewsComponentProps,
    ProductReviewsContainerMapDispatchProps,
    ProductReviewsContainerMapStateProps,
    ProductReviewsContainerProps,
} from './ProductReviews.type';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

/** @namespace Component/ProductReviews/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductReviewsContainerMapStateProps => ({
    isEnabled: state.ConfigReducer.reviews_are_enabled,
    isGuestEnabled: state.ConfigReducer.reviews_allow_guest,
    device: state.ConfigReducer.device,
});

/** @namespace Component/ProductReviews/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductReviewsContainerMapDispatchProps => ({
    showInfoNotification: (message) => NotificationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.showNotification(NotificationType.INFO, message),
    ),
});

/** @namespace Component/ProductReviews/Container */
export class ProductReviewsContainer extends PureComponent<ProductReviewsContainerProps> {
    static defaultProps: Partial<ProductReviewsContainerProps> = {
        isEnabled: true,
        isGuestEnabled: true,
        areDetailsLoaded: false,
    };

    containerProps(): ProductReviewsComponentProps {
        const {
            areDetailsLoaded,
            device,
            isEnabled,
            product,
        } = this.props;

        return {
            areDetailsLoaded,
            device,
            isEnabled,
            product,
        };
    }

    render(): ReactElement {
        const { isEnabled } = this.props;

        if (!isEnabled) {
            return null;
        }

        return (
            <ProductReviews
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewsContainer);
