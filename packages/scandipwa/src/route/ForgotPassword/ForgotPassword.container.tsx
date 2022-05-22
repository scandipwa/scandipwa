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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MyAccountOverlayContainer
} from 'Component/MyAccountOverlay/MyAccountOverlay.container';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import ForgotPassword from './ForgotPassword.component';
import { ForgotPasswordContainerMapDispatchProps, ForgotPasswordContainerProps } from './ForgotPassword.type';

/** @namespace Route/ForgotPassword/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ForgotPasswordContainerMapDispatchProps => ({
    ...sourceMapDispatchToProps(dispatch),
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible))
});

/** @namespace Route/ForgotPassword/Container */
export class ForgotPasswordContainer extends MyAccountOverlayContainer<ForgotPasswordContainerProps> {
    containerFunctions = {
        ...this.containerFunctions,
        onLoginClick: this.onLoginClick.bind(this),
        onCreateAccountClick: this.onCreateAccountClick.bind(this)
    };

    componentDidMount(): void {
        const { setHeaderState, toggleBreadcrumbs } = this.props;

        toggleBreadcrumbs(false);
        setHeaderState({
            name: Page.CUSTOMER_SUB_ACCOUNT,
            title: __('Forgot password'),
            onBackClick: (e) => {
                history.push({ pathname: appendWithStoreCode(`${AccountPageUrl.LOGIN_URL}`) });
                this.handleSignIn(e);
            }
        });
        scrollToTop({ behavior: 'smooth' });
    }

    onLoginClick(): void {
        history.replace(appendWithStoreCode(`${AccountPageUrl.LOGIN_URL}`));
    }

    onCreateAccountClick(): void {
        history.replace(appendWithStoreCode(`${AccountPageUrl.REGISTRATION_URL}`));
    }

    render(): ReactElement {
        return (
            <ForgotPassword
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
