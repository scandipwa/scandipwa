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

import { SignInStateType } from 'Type/Account.type';

import MyAccountForgotPasswordSuccess from './MyAccountForgotPasswordSuccess.component';

/** @namespace Component/MyAccountForgotPasswordSuccess/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    submittedEmail: state.MyAccountReducer.email
});

/** @namespace Component/MyAccountForgotPasswordSuccess/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({

});

/** @namespace Component/MyAccountForgotPasswordSuccess/Container */
export class MyAccountForgotPasswordSuccessContainer extends PureComponent {
        static propTypes = {
            state: SignInStateType.isRequired,
            handleSignIn: PropTypes.func.isRequired,
            submittedEmail: PropTypes.string.isRequired
        };

        containerProps() {
            const {
                state,
                handleSignIn,
                submittedEmail
            } = this.props;

            return {
                state,
                handleSignIn,
                submittedEmail
            };
        }

        render() {
            return (
                <MyAccountForgotPasswordSuccess
                  { ...this.containerProps() }
                />
            );
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountForgotPasswordSuccessContainer);
