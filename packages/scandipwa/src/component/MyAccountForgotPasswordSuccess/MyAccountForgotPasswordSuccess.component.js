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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { SignInStateType } from 'Type/Account.type';

/** @namespace Component/MyAccountForgotPasswordSuccess/Component */
export class MyAccountForgotPasswordSuccess extends PureComponent {
    static propTypes = {
        state: SignInStateType.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        submittedEmail: PropTypes.string.isRequired
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { state, handleSignIn, submittedEmail } = this.props;

        return (
            <article
              aria-labelledby="forgot-password-success"
              block="MyAccountOverlay"
              elem="Additional"
              mods={ { state } }
            >
                <p id="forgot-password-success">
                    { /* eslint-disable-next-line max-len */ }
                    { __('If there is an account associated with %s you will receive an email with a link to reset your password', submittedEmail) }
                </p>
                <button
                  block="Button"
                  onClick={ handleSignIn }
                >
                    { __('Got it') }
                </button>
            </article>
        );
    }
}

export default MyAccountForgotPasswordSuccess;
