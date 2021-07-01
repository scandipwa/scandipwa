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

import { CUSTOMER_ACCOUNT, FORGOT_PASSWORD, REGISTER } from 'Component/Header/Header.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MyAccountOverlayContainer
} from 'Component/MyAccountOverlay/MyAccountOverlay.container';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import LoginAccount from './LoginAccount.component';

/** @namespace Component/LoginAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible))
});

/** @namespace Scandipwa/Route/LoginAccount/Container/LoginAccountContainer */
export class LoginAccountContainer extends MyAccountOverlayContainer {
    static propTypes = {
        ...MyAccountOverlayContainer.propTypes,
        toggleBreadcrumbs: PropTypes.func.isRequired
    };

    containerFunctions = {
        ...this.containerFunctions,
        onCreateAccountClick: this.onCreateAccountClick.bind(this)
    };

    onCreateAccountClick() {
        history.replace(appendWithStoreCode(`${ REGISTER }`));
    }

    handleForgotPassword() {
        history.replace(appendWithStoreCode(`${ FORGOT_PASSWORD }`));
    }

    componentDidMount() {
        const { setHeaderState, toggleBreadcrumbs } = this.props;

        if (isSignedIn()) {
            history.push(appendWithStoreCode('/'));
        }

        setHeaderState({ name: CUSTOMER_ACCOUNT, title: __('Sign in') });
        toggleBreadcrumbs(false);
    }

    componentDidUpdate(prevProps, prevState) {
        if (isSignedIn()) {
            history.push(appendWithStoreCode('/'));

            return;
        }

        super.componentDidUpdate(prevProps, prevState);
    }

    render() {
        return (
            <LoginAccount
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAccountContainer);
