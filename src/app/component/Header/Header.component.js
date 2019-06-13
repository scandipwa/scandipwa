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
import PropTypes from 'prop-types';
import SearchBar from 'Component/SearchBar';
import MiniCart from 'Component/MiniCart';
import MyAccount from 'Component/MyAccount';
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
        const { isHeaderAndFooterVisible } = this.props;

        return isHeaderAndFooterVisible && (
            <header block="Header" aria-label="Header">
                <div block="Header" elem="Wrapper">
                    <div block="Header" elem="Logo" aria-label="Header logo">
                        <Link to="/" tabIndex="0">
                            <img
                              src="/static/frontend/Scandiweb/pwa/en_US/Magento_Theme/assets/images/global/logo.svg"
                              alt={ __('Header Logo') }
                            />
                        </Link>
                    </div>
                    <div block="Header" elem="Search" aria-label={ __('Header search bar') }>
                        <SearchBar />
                    </div>
                    <div block="Header" elem="Info" aria-label={ __('Header additional info') }>
                        <p>{ __('Delivery as soon as:') }</p>
                        <span>{ __('Next Day') }</span>
                    </div>
                </div>
                <ContentWrapper
                  wrapperMix={ { block: 'Header', elem: 'MenuWrapper' } }
                  mix={ { block: 'Header', elem: 'Menu' } }
                  label={ __('Main website navigation') }
                >
                    <Menu />
                    <MyAccount />
                    <MiniCart />
                </ContentWrapper>
            </header>
        );
    }
}

Header.propTypes = {
    isHeaderAndFooterVisible: PropTypes.bool.isRequired
};

export default Header;
