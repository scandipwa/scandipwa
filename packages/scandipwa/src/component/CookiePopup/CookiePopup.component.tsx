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

import Link from 'Component/Link';
import { ReactElement } from 'Type/Common.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { COOKIE_POPUP } from './CookiePopup.config';
import { CookiePopupComponentProps, CookiePopupComponentState } from './CookiePopup.type';

import './CookiePopup.style';

/** @namespace Component/CookiePopup/Component */
export class CookiePopup extends PureComponent<CookiePopupComponentProps, CookiePopupComponentState> {
    state: CookiePopupComponentState = {
        isAccepted: this.getAcceptCookieValue(),
    };

    __construct(props: CookiePopupComponentProps): void {
        super.__construct?.(props);

        this.acceptCookies = this.acceptCookies.bind(this);
    }

    getAcceptCookieValue(): boolean {
        const { code } = this.props;
        const param = `${ COOKIE_POPUP }_${ code }`;

        return !!BrowserDatabase.getItem(param);
    }

    acceptCookies(): void {
        const { code } = this.props;
        const param = `${ COOKIE_POPUP }_${ code }`;

        BrowserDatabase.setItem(true, param, ONE_MONTH_IN_SECONDS);
        this.setState({ isAccepted: true });
    }

    renderCookieLink(): ReactElement {
        const { cookieLink } = this.props;

        if (!cookieLink) {
            return null;
        }

        return (
            <Link
              block="CookiePopup"
              elem="Link"
              to={ cookieLink }
            >
                { __('View cookie policy') }
            </Link>
        );
    }

    renderCookieText(): ReactElement {
        const { cookieText } = this.props;

        return (
            <p block="CookiePopup" elem="Content">
                { cookieText }
                { this.renderCookieLink() }
            </p>
        );
    }

    renderCTA(): ReactElement {
        return (
            <div
              block="CookiePopup"
              elem="CTA"
              onClick={ this.acceptCookies }
              onKeyDown={ this.acceptCookies }
              role="button"
              tabIndex={ 0 }
            >
                { __('Got it') }
            </div>
        );
    }

    render(): ReactElement {
        const { cookieText } = this.props;
        const { isAccepted } = this.state;

        if (!cookieText || isAccepted) {
            return null;
        }

        return (
            <div block="CookiePopup">
                { this.renderCookieText() }
                { this.renderCTA() }
            </div>
        );
    }
}

export default CookiePopup;
