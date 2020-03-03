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

import CmsBlock from 'Component/CmsBlock';
import isMobile from 'Util/Mobile';
import Link from 'Component/Link';

import './Footer.style';

/**
 * Page footer
 * @class Footer
 */
export default class Footer extends PureComponent {
    static propTypes = {
        copyright: PropTypes.string,
        isVisibleOnMobile: PropTypes.bool
    };

    static defaultProps = {
        copyright: '',
        isVisibleOnMobile: false
    };

    renderContent() {
        const { footer_content: { footer_cms } = {} } = window.contentConfiguration;

        if (footer_cms) {
            return <CmsBlock identifiers={ [footer_cms] } />;
        }

        return (
            <div>
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
            </div>
        );
    }

    render() {
        const { copyright, isVisibleOnMobile } = this.props;

        if (!isVisibleOnMobile && isMobile.any()) {
            return null;
        }

        if (isVisibleOnMobile && !isMobile.any()) {
            return null;
        }

        return (
            <footer block="Footer" aria-label="Footer">
                { this.renderContent() }
                <span block="Footer" elem="Copyright">
                    { copyright }
                    { ' Powered by ' }
                    <a href="https://scandipwa.com">
                        ScandiPWA
                    </a>
                </span>
            </footer>
        );
    }
}
