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
import { fetchMutation } from 'Util/Request';

import ShareWishlistPopup from './ShareWishlistPopup.component';

/** @namespace Component/ShareWishlistPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (message) => dispatch(showNotification('success', __(message))),
    showError: (message) => dispatch(showNotification('error', __(message))),
    hidePopup: () => dispatch(showPopup('', {}))
});

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

        fetchMutation(WishlistQuery.getShareWishlistMutation({ message, emails })).then(
            /** @namespace Component/ShareWishlistPopup/Container/handleFormDataFetchMutationThen */
            () => {
                showNotification('Wishlist has been shared');
                hidePopup();
            },
            /** @namespace Component/ShareWishlistPopup/Container/handleFormDataFetchMutationCatch */
            ([{ message }]) => showError(message)
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

/** @namespace Component/ShareWishlistPopup/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ShareWishlistPopupContainer);
