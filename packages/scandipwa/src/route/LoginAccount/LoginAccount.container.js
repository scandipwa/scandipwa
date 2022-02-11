/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
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
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CUSTOMER_ACCOUNT } from 'Component/Header/Header.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MyAccountOverlayContainer
} from 'Component/MyAccountOverlay/MyAccountOverlay.container';
import { ACCOUNT_FORGOT_PASSWORD_URL, ACCOUNT_REGISTRATION_URL, ACCOUNT_URL } from 'Route/MyAccount/MyAccount.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { ISLOCKED } from 'Store/MyAccount/MyAccount.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import { LocationType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import LoginAccount from './LoginAccount.component';

/** @namespace Route/LoginAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Route/LoginAccount/Container */
export class LoginAccountContainer extends MyAccountOverlayContainer {
    static propTypes = {
        ...MyAccountOverlayContainer.propTypes,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        location: LocationType.isRequired
    };

    containerFunctions = {
        ...this.containerFunctions,
        onCreateAccountClick: this.onCreateAccountClick.bind(this)
    };

    onCreateAccountClick() {
        history.replace(appendWithStoreCode(`${ ACCOUNT_REGISTRATION_URL }`));
    }

    handleForgotPassword() {
        history.replace(appendWithStoreCode(`${ ACCOUNT_FORGOT_PASSWORD_URL }`));
    }

    componentDidMount() {
        const {
            setHeaderState,
            toggleBreadcrumbs,
            showErrorNotification,
            location: {
                state: {
                    isFromEmailChange = false,
                    isFromLocked = false
                } = {}
            }
        } = this.props;

        const isLocked = BrowserDatabase.getItem(ISLOCKED);

        if (isLocked || isFromLocked) {
            console.log('called');
            const message = 'The account sign-in was incorrect or your account is disabled temporarily.'
            + 'Please wait and try again later.';

            showErrorNotification(message);
            BrowserDatabase.deleteItem(ISLOCKED);
        } else if (isSignedIn() && !isFromEmailChange) {
            history.replace(appendWithStoreCode(ACCOUNT_URL));
        }
        console.log('component is mounted');

        setHeaderState({ name: CUSTOMER_ACCOUNT, title: __('Sign in') });
        toggleBreadcrumbs(false);
    }

    componentDidUpdate(prevProps, prevState) {
        if (isSignedIn()) {
            // remove login url from history to skip it when navigating back
            history.replace(appendWithStoreCode(ACCOUNT_URL));

            return;
        }

        super.componentDidUpdate(prevProps, prevState);
    }

    render() {
        return (
            <LoginAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginAccountContainer)
);
