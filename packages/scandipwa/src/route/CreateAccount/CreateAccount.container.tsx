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
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import CreateAccount from './CreateAccount.component';
import {
    CreateAccountContainerFunctions,
    CreateAccountContainerMapDispatchProps,
    CreateAccountContainerProps,
} from './CreateAccount.type';

/** @namespace Route/CreateAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CreateAccountContainerMapDispatchProps => ({
    ...sourceMapDispatchToProps(dispatch),
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
});

/** @namespace Route/CreateAccount/Container */
export class CreateAccountContainer extends MyAccountOverlayContainer<CreateAccountContainerProps> {
    containerFunctions: CreateAccountContainerFunctions = {
        ...this.containerFunctions,
        onLoginClick: this.onLoginClick.bind(this),
    };

    componentDidMount(): void {
        const { setHeaderState, toggleBreadcrumbs } = this.props;

        if (isSignedIn()) {
            // remove login url from history to skip it when navigating back after account create
            // + block access to create account for signed in user
            history.replace(appendWithStoreCode(AccountPageUrl.ACCOUNT_URL));
        }

        toggleBreadcrumbs(false);

        setHeaderState({
            name: Page.CUSTOMER_SUB_ACCOUNT,
            title: __('Create account'),
            onBackClick: (e) => {
                history.push({ pathname: appendWithStoreCode(`${AccountPageUrl.LOGIN_URL}`) });
                this.handleSignIn(e);
            },
        });
        scrollToTop({ behavior: 'smooth' });
    }

    onLoginClick(): void {
        history.replace(appendWithStoreCode(`${AccountPageUrl.LOGIN_URL}`));
    }

    render(): ReactElement {
        return (
            <CreateAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    CreateAccountContainer as unknown as ComponentType<CreateAccountContainerProps>,
);
