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

import './CookiePopup.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';
import BrowserDatabase from 'Util/BrowserDatabase';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { COOKIE_POPUP } from './CookiePopup.config';

export class CookiePopup extends PureComponent {
    static propTypes = {
        cookieText: PropTypes.string,
        cookieLink: PropTypes.string
    };

    static defaultProps = {
        cookieText: '',
        cookieLink: ''
    };

    state = { isAccepted: BrowserDatabase.getItem(COOKIE_POPUP) || false };

    acceptCookies = () => {
        BrowserDatabase.setItem(true, COOKIE_POPUP, ONE_MONTH_IN_SECONDS);
        this.setState({ isAccepted: true });
    };

    renderCookieLink() {
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
                { __('Read more') }
            </Link>
        );
    }

    renderCookieText() {
        const { cookieText } = this.props;

        return (
            <p block="CookiePopup" elem="Content">
                { cookieText }
                { this.renderCookieLink() }
            </p>
        );
    }

    renderCTA() {
        return (
            <div block="CookiePopup" elem="CTA">
                <button block="Button" onClick={ this.acceptCookies }>
                    { __('Accept') }
                </button>
            </div>
        );
    }

    render() {
        const { cookieText } = this.props;
        const { isAccepted } = this.state;

        if (!cookieText || isAccepted) {
            return null;
        }

        return (
            <div block="CookiePopup">
                <ContentWrapper
                  label="Cookie popup"
                  mix={ { block: 'CookiePopup', elem: 'Wrapper' } }
                  wrapperMix={ { block: 'CookiePopup', elem: 'ContentWrapper' } }
                >
                    { this.renderCookieText() }
                    { this.renderCTA() }
                </ContentWrapper>
            </div>
        );
    }
}

export default CookiePopup;
