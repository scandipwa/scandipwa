// import PropTypes from 'prop-types';

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
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ClickOutside from 'Component/ClickOutside';
import CloseIcon from 'Component/CloseIcon';
import Menu from 'Component/Menu';
import { DeviceType } from 'Type/Device';

import './HamburgerMenu.style';

/** @namespace Scandiweb/NavigationExtension/Component/HamburgerMenu/Component/HamburgerMenuComponent */
export class HamburgerMenuComponent extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired,
        isSideMenuOpen: PropTypes.bool.isRequired,
        closeSideMenu: PropTypes.func.isRequired
    };

    renderCloseMenuBtn() {
        const { closeSideMenu } = this.props;

        return (
            <button
              block="HamburgerMenu"
              elem="CloseBtn"
              onClick={ closeSideMenu }
              aria-label={ __('Close Menu') }
            >
                <CloseIcon />
            </button>
        );
    }

    render() {
        const { device: { isMobile }, isSideMenuOpen, closeSideMenu } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <ClickOutside
              onClick={ closeSideMenu }
              key="sideMenu"
            >
            <div block="HamburgerMenu" mods={ { isSideMenuOpen } }>
                { this.renderCloseMenuBtn() }
                <Menu />
            </div>
            </ClickOutside>
        );
    }
}

export default HamburgerMenuComponent;
