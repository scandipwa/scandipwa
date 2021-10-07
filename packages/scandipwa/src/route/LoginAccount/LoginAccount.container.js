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

import { CUSTOMER_ACCOUNT } from 'Component/Header/Header.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MyAccountOverlayContainer
} from 'Component/MyAccountOverlay/MyAccountOverlay.container';
import {
    ACCOUNT_FORGOT_PASSWORD_URL, ACCOUNT_LOGIN_URL, ACCOUNT_REGISTRATION_URL, ACCOUNT_URL
} from 'Route/MyAccount/MyAccount.config';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import LoginAccount from './LoginAccount.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Route/LoginAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
    )
});

/** @namespace Route/LoginAccount/Container */
export class LoginAccountContainer extends MyAccountOverlayContainer {
    static propTypes = {
        ...MyAccountOverlayContainer.propTypes,
        updateBreadcrumbs: PropTypes.func.isRequired
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
        const { setHeaderState, updateBreadcrumbs } = this.props;

        if (isSignedIn()) {
            history.replace(appendWithStoreCode(ACCOUNT_URL));
        }

        setHeaderState({ name: CUSTOMER_ACCOUNT, title: __('Sign in') });
        updateBreadcrumbs([
            { name: __('Login'), url: ACCOUNT_LOGIN_URL }
        ]);
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginAccountContainer);
