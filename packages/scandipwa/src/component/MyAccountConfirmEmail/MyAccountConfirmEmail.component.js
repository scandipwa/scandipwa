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

/** @namespace Component/MyAccountConfirmEmail/Component */
export class MyAccountConfirmEmail extends PureComponent {
    static propTypes = {
        state: SignInStateType.isRequired,
        handleSignIn: PropTypes.func.isRequired
    };

    render() {
        const { state, handleSignIn } = this.props;

        return (
            <article
              aria-labelledby="confirm-email-notice"
              block="MyAccountOverlay"
              elem="Additional"
              mods={ { state } }
            >
                <p id="confirm-email-notice">
                    { /* eslint-disable-next-line max-len */ }
                    { __('The email confirmation link has been sent to your email. Please confirm your account to proceed.') }
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

export default MyAccountConfirmEmail;
