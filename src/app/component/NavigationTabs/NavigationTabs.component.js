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

import NavigationAbstract from 'Component/NavigationAbstract/NavigationAbstract.component';
import './NavigationTabs.style';

export const HOME_TAB = 'HOME_TAB';
export const MENU_TAB = 'MENU_TAB';
export const ACCOUNT_TAB = 'ACCOUNT_TAB';
export const CART_TAB = 'CART_TAB';

class NavigationTabs extends NavigationAbstract {
    defaultStateName = MENU_TAB;

    stateMap = {
        [HOME_TAB]: {
            home: true
        },
        [MENU_TAB]: {
            menu: true
        },
        [ACCOUNT_TAB]: {
            account: true
        },
        [CART_TAB]: {
            minicart: true
        }
    };

    renderMap = {
        home: this.renderHomeButton.bind(this),
        menu: this.renderMenuButton.bind(this),
        minicart: this.renderMinicartButton.bind(this),
        account: this.renderAccountButton.bind(this)
    };

    renderHomeButton(isActive = false) {
        const { onHomeButtonClick } = this.props;

        return (
            <button
              key="home"
              block="Header"
              elem="Button"
              mix={ { block: 'NavigationTabs', elem: 'Button', mods: { isActive } } }
              mods={ { type: 'home', isVisible: true } }
              aria-label="Home"
              onClick={ onHomeButtonClick }
            />
        );
    }

    renderMenuButton(isActive = false) {
        const { onMenuButtonClick } = this.props;

        return (
            <button
              key="menu"
              block="Header"
              elem="Button"
              mix={ { block: 'NavigationTabs', elem: 'Button', mods: { isActive } } }
              mods={ { isVisible: true, type: 'menu' } }
              aria-label="Go to menu and search"
              onClick={ onMenuButtonClick }
            />
        );
    }

    renderAccountButton(isActive = false) {
        const { onMyAccountButtonClick } = this.props;

        return (
            <button
              key="account"
              block="Header"
              elem="Button"
              mix={ { block: 'NavigationTabs', elem: 'Button', mods: { isActive } } }
              mods={ { isVisible: true, type: 'account' } }
              onClick={ onMyAccountButtonClick }
              aria-label="Open my account"
            />
        );
    }

    renderMinicartButton(isActive = false) {
        const {
            cartTotals: { items_qty },
            onMinicartButtonClick
        } = this.props;

        return (
            <button
              key="minicart"
              block="Header"
              elem="Button"
              mix={ { block: 'NavigationTabs', elem: 'Button', mods: { isActive } } }
              mods={ { isVisible: true, type: 'minicart' } }
              onClick={ onMinicartButtonClick }
              aria-label="Minicart"
            >
                <span aria-label="Items in cart">{ items_qty || '0' }</span>
            </button>
        );
    }

    render() {
        return (
            <footer block="NavigationTabs">
                <nav block="NavigationTabs" elem="Nav">
                    { this.renderNavigationState() }
                </nav>
            </footer>
        );
    }
}

export default NavigationTabs;
