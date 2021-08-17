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

import { showNotification } from 'Store/Notification/Notification.action';
import { DeviceType } from 'Type/Device';
import { ProductType } from 'Type/ProductList';

import ProductReviews from './ProductReviews.component';

/** @namespace Component/ProductReviews/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isEnabled: state.ConfigReducer.reviews_are_enabled,
    isGuestEnabled: state.ConfigReducer.reviews_allow_guest,
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductReviews/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showInfoNotification: (message) => dispatch(showNotification('info', message))
});

/** @namespace Component/ProductReviews/Container */
export class ProductReviewsContainer extends PureComponent {
    static propTypes = {
        showInfoNotification: PropTypes.func.isRequired,
        isGuestEnabled: PropTypes.bool,
        isEnabled: PropTypes.bool,
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        isEnabled: true,
        isGuestEnabled: true,
        areDetailsLoaded: false
    };

    containerProps() {
        const {
            areDetailsLoaded,
            device,
            isEnabled,
            product
        } = this.props;

        return {
            areDetailsLoaded,
            device,
            isEnabled,
            product
        };
    }

    render() {
        const { isEnabled } = this.props;

        if (!isEnabled) {
            return null;
        }

        return (
            <ProductReviews
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewsContainer);
