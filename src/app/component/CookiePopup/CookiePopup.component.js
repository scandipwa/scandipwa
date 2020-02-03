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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import BrowserDatabase from 'Util/BrowserDatabase';
import Link from 'Component/Link';

import './CookiePopup.style';

export const COOKIE_POPUP = 'cookie_popup';

class CookiePopup extends PureComponent {
    static propTypes = {
        cookieText: PropTypes.string.isRequired,
        cookieLink: PropTypes.string.isRequired
    };

    state = { isAccepted: BrowserDatabase.getItem(COOKIE_POPUP) || false };

    acceptCookies = this.acceptCookies.bind(this);

    acceptCookies = () => {
        /* eslint no-magic-numbers: ["error", { "ignore": [2592000] }] */
        BrowserDatabase.setItem(true, COOKIE_POPUP, 2592000); // 2592000 === 1 month
        this.setState({ isAccepted: true });
    };

    render() {
        const { cookieText, cookieLink } = this.props;
        const { isAccepted } = this.state;

        if (!cookieText || isAccepted) return null;

        return (
            <div block="CookiePopup">
                <div block="CookiePopup" elem="Content">
                    <p>
                        { cookieText }
                        { cookieLink && <Link to={ cookieLink }>{ __('- read more') }</Link> }
                    </p>
                </div>
                <div block="CookiePopup" elem="CTA">
                    <button block="Button" onClick={ this.acceptCookies }>
                        { __('Accept') }
                    </button>
                </div>
            </div>
        );
    }
}

export default CookiePopup;
