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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.style';

/**
 * Page footer
 * @class Footer
 */
class Footer extends Component {
    render() {
        return (
            <footer block="Footer" aria-label="Footer">
                <Link to="/page/privacy-policy-cookie-restriction-mode" className="Footer-Link">
                    Privicy policy
                </Link>
                <Link to="/page/terms-and-conditions" className="Footer-Link">
                    Shopping terms and conditions
                </Link>
            </footer>
        );
    }
}

export default Footer;
