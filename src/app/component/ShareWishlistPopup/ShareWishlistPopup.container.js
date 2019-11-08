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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showPopup } from 'Store/Popup';
import { showNotification } from 'Store/Notification';
import ShareWishlistPopup from './ShareWishlistPopup.component';

export const mapDispatchToProps = dispatch => ({
    showError: message => dispatch(showNotification('error', __(message))),
    hidePopup: () => dispatch(showPopup('', {}))
});

export class ShareWishlistPopupContainer extends PureComponent {
    static propTypes = {
        showError: PropTypes.func.isRequired,
        hidePopup: PropTypes.func.isRequired
    };

    handleFormData = (fields) => {
        const { hidePopup } = this.props;
        const { emails: initialEmails } = fields;

        const emails = initialEmails.split(',').map(email => email.trim());

        // TODO? send request to server after BE is ready
        hidePopup();
    };

    containerFunctions = () => ({
        handleFormData: this.handleFormData
    });

    render() {
        return (
            <ShareWishlistPopup
              { ...this.props }
              { ...this.containerFunctions() }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(ShareWishlistPopupContainer);
