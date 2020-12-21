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
import { showPopup } from 'Store/Popup/Popup.action';
import { isSignedIn } from 'Util/Auth';

import ProductReviews from './ProductReviews.component';
import { REVIEW_POPUP_ID } from './ProductReviews.config';

/** @namespace Component/ProductReviews/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isEnabled: state.ConfigReducer.reviews_are_enabled,
    isGuestEnabled: state.ConfigReducer.reviews_allow_guest
});

/** @namespace Component/ProductReviews/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(REVIEW_POPUP_ID, payload)),
    showInfoNotification: (message) => dispatch(showNotification('info', message))
});

/** @namespace Component/ProductReviews/Container */
export class ProductReviewsContainer extends PureComponent {
    static propTypes = {
        showInfoNotification: PropTypes.func.isRequired,
        showPopup: PropTypes.func.isRequired,
        isGuestEnabled: PropTypes.bool,
        isEnabled: PropTypes.bool
    };

    static defaultProps = {
        isEnabled: true,
        isGuestEnabled: true
    };

    containerFunctions = {
        showPopup: this._showPopup.bind(this)
    };

    _showPopup() {
        const {
            showPopup,
            isGuestEnabled,
            showInfoNotification
        } = this.props;

        // if not logged in and guest reviews are not enabled
        if (!isSignedIn() && !isGuestEnabled) {
            showInfoNotification(__('You must login or register to review products.'));

            return;
        }

        showPopup({ title: __('Write a new review') });
    }

    render() {
        const { isEnabled } = this.props;

        if (!isEnabled) {
            return null;
        }

        return (
            <ProductReviews
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewsContainer);
