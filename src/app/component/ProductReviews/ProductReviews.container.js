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

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { showPopup } from 'Store/Popup';

import ProductReviews, { REVIEW_POPUP_ID } from './ProductReviews.component';

export const mapDispatchToProps = dispatch => ({
    showPopup: payload => dispatch(showPopup(REVIEW_POPUP_ID, payload))
});

export class ProductReviewsContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired
    };

    containerFunctions = {
        showPopup: this._showPopup.bind(this)
    };

    _showPopup() {
        const { showPopup } = this.props;
        showPopup({ title: __('Write a new review') });
    }

    render() {
        return (
            <ProductReviews
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(ProductReviewsContainer);
