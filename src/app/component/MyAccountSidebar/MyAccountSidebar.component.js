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
import './MyAccountSidebar.style';

/**
 * My account Sidebar
 * @class MyAccountSidebar
 */
class MyAccountSidebar extends Component {
    render() {
        return (
            <div block="Sidebar">
                <div block="Sidebar" elem="SideLink">
                    <Link to="/my-account">
                        { __('My Account') }
                    </Link>
                </div>
                <div block="Sidebar" elem="SideLink">
                    <Link to="/my-account/orders">
                        { __('My Orders') }
                    </Link>
                </div>
                <div block="Sidebar" elem="SideLink">
                    <Link to="/wishlist">
                        { __('My Wish List') }
                    </Link>
                </div>
            </div>
        );
    }
}

export default MyAccountSidebar;
