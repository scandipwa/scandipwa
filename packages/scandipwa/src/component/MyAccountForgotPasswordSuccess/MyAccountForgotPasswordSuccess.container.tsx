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

import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountForgotPasswordSuccess from './MyAccountForgotPasswordSuccess.component';
import {
    MyAccountForgotPasswordSuccessContainerMapDispatchProps,
    MyAccountForgotPasswordSuccessContainerMapStateProps,
    MyAccountForgotPasswordSuccessContainerProps,
    MyAccountForgotPasswordSuccessContainerPropsKeys,
    MyAccountForgotPasswordSuccessContainerState,
} from './MyAccountForgotPasswordSuccess.type';

/** @namespace Component/MyAccountForgotPasswordSuccess/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountForgotPasswordSuccessContainerMapStateProps => ({
    submittedEmail: state.MyAccountReducer.email,
});

/** @namespace Component/MyAccountForgotPasswordSuccess/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountForgotPasswordSuccessContainerMapDispatchProps => ({});

/** @namespace Component/MyAccountForgotPasswordSuccess/Container */
export class MyAccountForgotPasswordSuccessContainer<
P extends Readonly<MyAccountForgotPasswordSuccessContainerProps> = Readonly<MyAccountForgotPasswordSuccessContainerProps>,
S extends MyAccountForgotPasswordSuccessContainerState = MyAccountForgotPasswordSuccessContainerState,
> extends PureComponent<P, S> {
    containerProps(): Pick<
    MyAccountForgotPasswordSuccessContainerProps,
    MyAccountForgotPasswordSuccessContainerPropsKeys
    > {
        const {
            state,
            handleSignIn,
            submittedEmail,
        } = this.props;

        return {
            state,
            handleSignIn,
            submittedEmail,
        };
    }

    render(): ReactElement {
        return (
            <MyAccountForgotPasswordSuccess
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountForgotPasswordSuccessContainer);
