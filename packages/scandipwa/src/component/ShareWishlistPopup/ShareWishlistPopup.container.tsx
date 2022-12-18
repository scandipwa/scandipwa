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

import WishlistQuery from 'Query/Wishlist.query';
import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';
import { GQLShareWishlistInput } from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation, getErrorMessage } from 'Util/Request';

import ShareWishlistPopup from './ShareWishlistPopup.component';
import {
    ShareWishlistPopupComponentProps,
    ShareWishlistPopupContainerFunctions,
    ShareWishlistPopupContainerMapDispatchProps,
    ShareWishlistPopupContainerMapStateProps,
    ShareWishlistPopupContainerProps,
    ShareWishlistPopupContainerPropsKeys,
    ShareWishlistPopupContainerState,
} from './ShareWishlistPopup.type';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

/** @namespace Component/ShareWishlistPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ShareWishlistPopupContainerMapDispatchProps => ({
    showNotification: (message) => NotificationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.showNotification(NotificationType.SUCCESS, message),
    ),
    showError: (message) => NotificationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.showNotification(NotificationType.ERROR, message),
    ),
    hidePopup: () => dispatch(showPopup('', {})),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE)),
});

/** @namespace Component/ShareWishlistPopup/Container/mapStateToProps */
export const mapStateToProps = (): ShareWishlistPopupContainerMapStateProps => ({});

/** @namespace Component/ShareWishlistPopup/Container */
export class ShareWishlistPopupContainer extends PureComponent<
ShareWishlistPopupContainerProps,
ShareWishlistPopupContainerState
> {
    state: ShareWishlistPopupContainerState = {
        isLoading: false,
    };

    containerFunctions: ShareWishlistPopupContainerFunctions = {
        handleFormData: this.handleFormData.bind(this),
    };

    containerProps(): Pick<ShareWishlistPopupComponentProps, ShareWishlistPopupContainerPropsKeys> {
        const { isLoading } = this.state;

        return {
            isFormLoading: isLoading,
        };
    }

    handleFormData(fields: GQLShareWishlistInput): void {
        const {
            hidePopup,
            showError,
            showNotification,
            goToPreviousNavigationState,
        } = this.props;
        const { message, emails: initialEmails } = fields;
        const emails = initialEmails.toString().split(',').map((email) => email.trim());

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
            },
        );
    }

    render(): ReactElement {
        return (
            <ShareWishlistPopup
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareWishlistPopupContainer);
