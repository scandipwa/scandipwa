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
import { ACCOUNT_LOGIN_URL, ACCOUNT_URL } from 'Route/MyAccount/MyAccount.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import CreateAccount from './CreateAccount.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Route/CreateAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible))
});

/** @namespace Route/CreateAccount/Container */
export class CreateAccountContainer extends MyAccountOverlayContainer {
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
        onLoginClick: this.onLoginClick.bind(this)
    };

    componentDidMount() {
        const { setHeaderState, toggleBreadcrumbs } = this.props;

        if (isSignedIn()) {
            // remove login url from history to skip it when navigating back after account create
            // + block access to create account for signed in user
            history.replace(appendWithStoreCode(ACCOUNT_URL));
        }

        toggleBreadcrumbs(false);

        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: __('Create account'),
            onBackClick: (e) => {
                history.push({ pathname: appendWithStoreCode(`${ ACCOUNT_LOGIN_URL }`) });
                this.handleSignIn(e);
            }
        });
    }

    onLoginClick() {
        history.replace(appendWithStoreCode(`${ ACCOUNT_LOGIN_URL }`));
    }

    render() {
        return (
            <CreateAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer);
