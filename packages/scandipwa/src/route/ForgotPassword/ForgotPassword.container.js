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

import { CUSTOMER_SUB_ACCOUNT } from 'Component/Header/Header.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MyAccountOverlayContainer
} from 'Component/MyAccountOverlay/MyAccountOverlay.container';
import { ACCOUNT_LOGIN_URL, ACCOUNT_REGISTRATION_URL } from 'Route/MyAccount/MyAccount.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import ForgotPassword from './ForgotPassword.component';

/** @namespace Route/ForgotPassword/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible))
});

/** @namespace Route/ForgotPassword/Container */
export class ForgotPasswordContainer extends MyAccountOverlayContainer {
    static propTypes = {
        ...MyAccountOverlayContainer.propTypes,
        updateBreadcrumbs: PropTypes.func.isRequired
    };

    containerProps() {
        const { device } = this.props;

        return {
            ...super.containerProps(),
            device
        };
    }

    containerFunctions = {
        ...this.containerFunctions,
        onLoginClick: this.onLoginClick.bind(this),
        onCreateAccountClick: this.onCreateAccountClick.bind(this)
    };

    componentDidMount() {
        const { setHeaderState, toggleBreadcrumbs } = this.props;

        toggleBreadcrumbs(false);
        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: __('Forgot password'),
            onBackClick: (e) => {
                history.push({ pathname: appendWithStoreCode(`${ ACCOUNT_LOGIN_URL }`) });
                this.handleSignIn(e);
            }
        });
    }

    onLoginClick() {
        history.replace(appendWithStoreCode(`${ ACCOUNT_LOGIN_URL }`));
    }

    onCreateAccountClick() {
        history.replace(appendWithStoreCode(`${ ACCOUNT_REGISTRATION_URL }`));
    }

    render() {
        return (
            <ForgotPassword
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
