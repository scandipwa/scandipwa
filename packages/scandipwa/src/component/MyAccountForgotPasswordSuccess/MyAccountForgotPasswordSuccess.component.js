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
import { PureComponent } from 'react';

import { signInStateType } from 'Type/Account';

/** @namespace Component/MyAccountForgotPasswordSuccess/Component */
export class MyAccountForgotPasswordSuccess extends PureComponent {
    static propTypes = {
        state: signInStateType.isRequired,
        handleSignIn: PropTypes.func.isRequired
    };

    render() {
        const { state, handleSignIn } = this.props;

        return (
            <article
              aria-labelledby="forgot-password-success"
              block="MyAccountOverlay"
              elem="Additional"
              mods={ { state } }
            >
                <p id="forgot-password-success">
                    { /* eslint-disable-next-line max-len */ }
                    { __('If there is an account associated with the provided address you will receive an email with a link to reset your password') }
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
