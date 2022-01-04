/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';

import Link from 'Component/Link';
import Logo from 'Component/Logo';
import MyAccountOrderPrint from 'Component/MyAccountOrderPrint';
import { MatchType } from 'Type/Router.type';
import CSS from 'Util/CSS';
import media from 'Util/Media';
import { LOGO_MEDIA } from 'Util/Media/Media';

import './OrderPrintPage.style';

/** @namespace Route/OrderPrintPage/Component */
export class OrderPrintPage extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        logo_alt: PropTypes.string.isRequired,
        logo_src: PropTypes.string.isRequired,
        logo_height: PropTypes.number.isRequired,
        logo_width: PropTypes.number.isRequired
    };

    logoRef = createRef();

    renderLogoImage() {
        const {
            logo_src,
            logo_alt,
            logo_height,
            logo_width
        } = this.props;

        // if no src defined from the backend, pass null in order to display placeholder
        // and prevent unnecessary load of corrupted resource
        const logoSrc = logo_src ? media(logo_src, LOGO_MEDIA) : null;

        CSS.setVariable(this.logoRef, 'header-logo-height', `${logo_height}px`);
        CSS.setVariable(this.logoRef, 'header-logo-width', `${logo_width}px`);

        return (
            <Link
              to="/"
              aria-label="Go to homepage by clicking on ScandiPWA logo"
              block="OrderPrintPage"
              elem="LogoWrapper"
              key="logo"
            >
                <Logo
                  src={ logoSrc }
                  alt={ logo_alt }
                  title={ logo_alt }
                />
            </Link>
        );
    }

    renderCopyright() {
        return null;
    }

    render() {
        const { match } = this.props;

        return (
            <div
              block="OrderPrintPage"
              ref={ this.logoRef }
            >
                { this.renderLogoImage() }
                <MyAccountOrderPrint match={ match } />
                { this.renderCopyright() }
            </div>
        );
    }
}

export default OrderPrintPage;
