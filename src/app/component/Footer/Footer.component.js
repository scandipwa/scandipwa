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

import React, { PureComponent } from 'react';
import Link from 'Component/Link';
import './Footer.style';

/**
 * Page footer
 * @class Footer
 */
class Footer extends PureComponent {
    render() {
        return (
            <footer block="Footer" aria-label="Footer">
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
            </footer>
        );
    }
}

export default Footer;
