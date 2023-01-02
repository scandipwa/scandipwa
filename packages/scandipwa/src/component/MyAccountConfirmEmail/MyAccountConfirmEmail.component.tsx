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

import { ReactElement } from 'Type/Common.type';

import { MyAccountConfirmEmailComponentProps, MyAccountConfirmEmailComponentState } from './MyAccountConfirmEmail.type';

/** @namespace Component/MyAccountConfirmEmail/Component */
export class MyAccountConfirmEmailComponent<
P extends Readonly<MyAccountConfirmEmailComponentProps> = Readonly<MyAccountConfirmEmailComponentProps>,
S extends MyAccountConfirmEmailComponentState = MyAccountConfirmEmailComponentState,
> extends PureComponent<P, S> {
    render(): ReactElement {
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

export default MyAccountConfirmEmailComponent;
