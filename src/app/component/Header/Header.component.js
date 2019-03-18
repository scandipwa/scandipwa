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
import MiniCart from 'Component/MiniCart';
import { Link } from 'react-router-dom';
import ContentWrapper from 'Component/ContentWrapper';
import Menu from 'Component/Menu';
import './Header.style';

/**
 * Page Header
 * @class Header
 */
class Header extends Component {
    render() {
        return (
            <header block="Header" aria-label="Header">
                <div block="Header" elem="Wrapper">
                    <div block="Header" elem="Logo" aria-label="Header logo">
                        <Link to="/" tabIndex="0">
                            <img
                              src="/static/frontend/Scandiweb/pwa/en_US/Magento_Theme/assets/images/global/logo.svg"
                              alt="HeaderLogo"
                            />
                        </Link>
                    </div>
                    {/* TODO: Bring back search when functionality will be implemented */}
                    {/* <div block="Header" elem="Search" aria-label="Header search bar">
                        <Field
                          type="text"
                          id="HeaderInput"
                          placeholder="Type a new search"
                        />
                    </div> */}
                    <div block="Header" elem="Info" aria-label="Header additional info">
                        <p>Delivery as soon as:</p>
                        <span>Next Day</span>
                    </div>
                </div>
                <ContentWrapper
                  wrapperMix={ { block: 'Header', elem: 'MenuWrapper' } }
                  mix={ { block: 'Header', elem: 'Menu' } }
                  label="Main website navigation"
                >
                    <Menu />
                    <MiniCart />
                </ContentWrapper>
            </header>
        );
    }
}

export default Header;
