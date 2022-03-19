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
import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation, getErrorMessage } from 'Util/Request';

import ShareWishlistPopup from './ShareWishlistPopup.component';

/** @namespace Component/ShareWishlistPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (message) => dispatch(showNotification('success', message)),
    showError: (message) => dispatch(showNotification('error', message)),
    hidePopup: () => dispatch(showPopup('', {})),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

/** @namespace Component/ShareWishlistPopup/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/ShareWishlistPopup/Container */
export class ShareWishlistPopupContainer extends PureComponent {
    state = {
        isLoading: false
    };

    static propTypes = {
        showError: PropTypes.func.isRequired,
        hidePopup: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        goToPreviousNavigationState: PropTypes.func.isRequired
    };

    containerFunctions = {
        handleFormData: this.handleFormData.bind(this)
    };

    containerProps() {
        const { isLoading } = this.state;

        return {
            isFormLoading: isLoading
        };
    }

    handleFormData(fields) {
        const {
            hidePopup, showError, showNotification, goToPreviousNavigationState
        } = this.props;
        const { message, emails: initialEmails } = fields;
        const emails = initialEmails.split(',').map((email) => email.trim());

        if (!isSignedIn()) {
            return;
        }

        this.setState({ isLoading: true });

        fetchMutation(WishlistQuery.getShareWishlistMutation({ message, emails })).then(
            /** @namespace Component/ShareWishlistPopup/Container/ShareWishlistPopupContainer/handleFormData/fetchMutation/then */
            () => {
                showNotification(__('Wishlist has been shared'));
                hidePopup();
                this.setState({ isLoading: false });
                goToPreviousNavigationState();
            },
            /** @namespace Component/ShareWishlistPopup/Container/ShareWishlistPopupContainer/handleFormData/fetchMutation/then/catch */
            (error) => {
                showError(getErrorMessage(error));
                this.setState({ isLoading: false });
            }
        );
    }

    render() {
        return (
            <ShareWishlistPopup
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareWishlistPopupContainer);
