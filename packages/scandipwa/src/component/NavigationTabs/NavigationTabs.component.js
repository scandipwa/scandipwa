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

import CartIcon from 'Component/CartIcon';
import HomeIcon from 'Component/HomeIcon';
import MenuIcon from 'Component/MenuIcon';
import NavigationAbstract from 'Component/NavigationAbstract/NavigationAbstract.component';
import UserIcon from 'Component/UserIcon';
import { DeviceType } from 'Type/Device.type';

import {
    ACCOUNT_TAB,
    CART_TAB,
    HOME_TAB,
    MENU_TAB
} from './NavigationTabs.config';

import './NavigationTabs.style';

/** @namespace Component/NavigationTabs/Component */
export class NavigationTabs extends NavigationAbstract {
    static propTypes = {
        device: DeviceType.isRequired
    };

    defaultStateName = MENU_TAB;

    stateMap = {
        [HOME_TAB]: {
            home: true
        },
        [MENU_TAB]: {
            menu: true
        },
        [CART_TAB]: {
            minicart: true
        },
        [ACCOUNT_TAB]: {
            account: true
        }
    };

    renderMap = {
        home: this.renderHomeButton.bind(this),
        menu: this.renderMenuButton.bind(this),
        account: this.renderAccountButton.bind(this),
        minicart: this.renderMinicartButton.bind(this)
    };

    shouldComponentUpdate(nextProps) {
        const {
            navigationState: { name: prevName },
            cartTotals: { items_qty: prevQty },
            device: prevDevice
        } = this.props;

        const {
            navigationState: { name: nextName },
            cartTotals: { items_qty: nextQty },
            device: nextDevice
        } = nextProps;

        return prevName !== nextName || nextQty !== prevQty || prevDevice !== nextDevice;
    }

    renderHomeButton(isActive = false) {
        const { onHomeButtonClick } = this.props;

        return (
            <button
              key="home"
              block="NavigationTabs"
              elem="Button"
              aria-label="Home"
              onClick={ onHomeButtonClick }
            >
                <HomeIcon isActive={ isActive } />
            </button>
        );
    }

    renderMenuButton(isActive = false) {
        const { onMenuButtonClick } = this.props;

        return (
            <button
              key="menu"
              block="NavigationTabs"
              elem="Button"
              aria-label="Go to menu and search"
              onClick={ onMenuButtonClick }
            >
                <MenuIcon isActive={ isActive } />
            </button>
        );
    }

    renderAccountButton(isActive = false) {
        const { onMyAccountButtonClick } = this.props;

        return (
            <button
              key="account"
              block="NavigationTabs"
              elem="Button"
              onClick={ onMyAccountButtonClick }
              aria-label="Open my account"
            >
                <UserIcon isActive={ isActive } />
            </button>
        );
    }

    renderMinicartItemsQty() {
        const { cartTotals: { items_qty } } = this.props;

        if (!items_qty) {
            return null;
        }

        return (
            <span
              aria-label="Items in cart"
              block="Header"
              elem="MinicartItemCount"
            >
                { items_qty }
            </span>
        );
    }

    renderMinicartButton(isActive = false) {
        const { onMinicartButtonClick } = this.props;

        return (
            <button
              key="mincart"
              block="NavigationTabs"
              elem="Button"
              onClick={ onMinicartButtonClick }
              aria-label="Minicart"
            >
                <div block="Header" elem="MinicartWrapper">
                    <div
                      block="Header"
                      elem="Button"
                      mix={ { block: 'NavigationTabs', elem: 'Icon', mods: { isActive } } }
                      mods={ { isVisible: true, type: 'minicart' } }
                    >
                        <CartIcon isActive={ isActive } />
                    </div>
                    { this.renderMinicartItemsQty() }
                </div>
            </button>
        );
    }

    render() {
        const { navigationState: { isHidden }, device } = this.props;

        if (!device.isMobile) {
            return null;
        }

        return (
            <footer
              block="NavigationTabs"
              mods={ { isHidden } }
              mix={ { block: 'FixedElement', elem: 'Bottom' } }
            >
                <nav block="NavigationTabs" elem="Nav">
                    { this.renderNavigationState() }
                </nav>
            </footer>
        );
    }
}

export default NavigationTabs;
