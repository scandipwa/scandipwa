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

import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MyAccountOverlayContainer,
} from 'Component/MyAccountOverlay/MyAccountOverlay.container';
import { MyAccountOverlayContainerState } from 'Component/MyAccountOverlay/MyAccountOverlay.type';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth/IsSignedIn';
import { scrollToTop } from 'Util/Browser';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import LoginAccount from './LoginAccount.component';
import {
    LoginAccountContainerFunctions,
    LoginAccountContainerMapDispatchProps,
    LoginAccountContainerProps,
} from './LoginAccount.type';

/** @namespace Route/LoginAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): LoginAccountContainerMapDispatchProps => ({
    ...sourceMapDispatchToProps(dispatch),
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
});

/** @namespace Route/LoginAccount/Container */
export class LoginAccountContainer extends MyAccountOverlayContainer<LoginAccountContainerProps> {
    containerFunctions: LoginAccountContainerFunctions = {
        ...this.containerFunctions,
        onCreateAccountClick: this.onCreateAccountClick.bind(this),
    };

    onCreateAccountClick(): void {
        history.replace(appendWithStoreCode(`${AccountPageUrl.REGISTRATION_URL}`));
    }

    handleForgotPassword(): void {
        history.replace(appendWithStoreCode(`${AccountPageUrl.FORGOT_PASSWORD_URL}`));
    }

    componentDidMount(): void {
        const {
            setHeaderState,
            toggleBreadcrumbs,
        } = this.props;
        const {
            location: {
                state: {
                    isFromEmailChange = false,
                    isFromLocked = false,
                } = {},
            },
        } = history;

        if (isSignedIn() && (!isFromEmailChange && !isFromLocked)) {
            history.replace(appendWithStoreCode(AccountPageUrl.ACCOUNT_URL));
        }

        setHeaderState({ name: Page.CUSTOMER_ACCOUNT, title: __('Sign in') });
        toggleBreadcrumbs(false);
        scrollToTop({ behavior: 'smooth' });
    }

    componentDidUpdate(prevProps: LoginAccountContainerProps, prevState: MyAccountOverlayContainerState): void {
        if (isSignedIn()) {
            // remove login url from history to skip it when navigating back
            history.replace(appendWithStoreCode(AccountPageUrl.ACCOUNT_URL));

            return;
        }

        super.componentDidUpdate(prevProps, prevState);
    }

    render(): ReactElement {
        return (
            <LoginAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default
connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    LoginAccountContainer as unknown as ComponentType<LoginAccountContainerProps>,
);
