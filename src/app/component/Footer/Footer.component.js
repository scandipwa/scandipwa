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
import Link from 'Component/Link';
import Logo from 'Component/Logo';
import media from 'Util/Media';
import { LOGO_MEDIA } from 'Util/Media/Media';
import './Footer.style';

/**
 * Page footer
 * @class Footer
 */
export default class Footer extends PureComponent {
    static propTypes = {
        copyright: PropTypes.string,
        header_logo_src: PropTypes.string,
        logo_alt: PropTypes.string,
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        logo_alt: 'ScandiPWA logo',
        header_logo_src: '',
        isLoading: true,
        copyright: ''
    };

    renderLogoImage() {
        const {
            header_logo_src,
            logo_alt
        } = this.props;

        return (
            <Logo
              src={ media(header_logo_src, LOGO_MEDIA) }
              alt={ logo_alt }
              footerLogo
            />
        );
    }

    renderLogo(isVisible = false) {
        const { isLoading } = this.props;

        if (isLoading) return null;
        return (
            <Link
              to="/"
              aria-label="Go to homepage by clicking on ScandiPWA logo"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
              block="Footer"
              elem="LogoWrapper"
              mods={ { isVisible } }
              key="logo"
              itemScope
              itemType="http://schema.org/Organization"
            >
                <meta itemProp="legalName" content="ScandiPWA" />
                <meta itemProp="parentOrganization" content="Scandiweb" />
                { this.renderLogoImage() }
            </Link>
        );
    }

    render() {
        const { copyright } = this.props;

        return (
            <footer block="Footer" aria-label="Footer">
                <div block="Footer" elem="Wrapper">
                    <Link
                      block="Footer"
                      elem="Link"
                      to="/page/privacy-policy-cookie-restriction-mode"
                    >
                        { __('Privacy policy') }
                    </Link>
                    <Link
                      block="Footer"
                      elem="Link"
                      to="/page/terms-and-conditions"
                    >
                        { __('Shopping terms and conditions') }
                    </Link>
                    <span block="Footer" elem="Copyright">{ copyright }</span>
                    { this.renderLogo() }
                </div>
            </footer>
        );
    }
}
