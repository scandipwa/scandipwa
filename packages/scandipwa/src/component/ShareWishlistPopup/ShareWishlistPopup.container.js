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

import WishlistQuery from 'Query/Wishlist.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation, getErrorMessage } from 'Util/Request';

import ShareWishlistPopup from './ShareWishlistPopup.component';

/** @namespace Component/ShareWishlistPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (message) => dispatch(showNotification('success', message)),
    showError: (message) => dispatch(showNotification('error', message)),
    hidePopup: () => dispatch(showPopup('', {}))
});

/** @namespace Component/ShareWishlistPopup/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/ShareWishlistPopup/Container/shareWishlistPopupContainer */
export class ShareWishlistPopupContainer extends PureComponent {
    static propTypes = {
        showError: PropTypes.func.isRequired,
        hidePopup: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired
    };

    handleFormData = (fields) => {
        const { hidePopup, showError, showNotification } = this.props;
        const { message, emails: initialEmails } = fields;
        const emails = initialEmails.split(',').map((email) => email.trim());

        if (!isSignedIn()) {
            return;
        }

        fetchMutation(WishlistQuery.getShareWishlistMutation({ message, emails })).then(
            /** @namespace Component/ShareWishlistPopup/Container/handleFormDataFetchMutationThen */
            () => {
                showNotification(__('Wishlist has been shared'));
                hidePopup();
            },
            /** @namespace Component/ShareWishlistPopup/Container/handleFormDataFetchMutationCatch */
            (error) => showError(getErrorMessage(error))
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareWishlistPopupContainer);
