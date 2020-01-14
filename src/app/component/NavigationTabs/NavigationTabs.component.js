import PropTypes from 'prop-types';
import MenuOverlay from 'Component/MenuOverlay';
import CartOverlay from 'Component/CartOverlay';
import ClickOutside from 'Component/ClickOutside';
import MyAccountOverlay from 'Component/MyAccountOverlay';
import NavigationAbstract, { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.component';
import './NavigationTabs.style';

class NavigationTabs extends NavigationAbstract {
    static propTypes = {
        // TODO: implement prop-types
    };

    stateMap = {
        [DEFAULT_STATE_NAME]: {
            home: true,
            menu: true,
            account: true,
            minicart: true
        }
    };

    renderMap = {
        home: this.renderHomeButton.bind(this),
        menu: this.renderMenuButton.bind(this),
        account: this.renderAccountButton.bind(this),
        minicart: this.renderMinicartButton.bind(this)
    };

    renderHomeButton(isVisible = false) {
        return <div></div>;
    }

    renderMenuButton(isVisible = false) {
        const {
            onMenuOutsideClick,
            onMenuButtonClick
        } = this.props;

        return (
            <ClickOutside onClick={ onMenuOutsideClick } key="menu">
                <div>
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'menu' } }
                      aria-label="Go to menu and search"
                      aria-hidden={ !isVisible }
                      tabIndex={ isVisible ? 0 : -1 }
                      onClick={ onMenuButtonClick }
                    />
                </div>
            </ClickOutside>
        );
    }

    renderAccountButton(isVisible = false) {
        const {
            onMyAccountOutsideClick,
            onMyAccountButtonClick
        } = this.props;

        return (
            <ClickOutside onClick={ onMyAccountOutsideClick } key="account">
                <div aria-label="My account">
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'account' } }
                      onClick={ onMyAccountButtonClick }
                      aria-label="Open my account"
                    />
                </div>
            </ClickOutside>
        );
    }

    renderMinicartButton(isVisible = false) {
        const {
            cartTotals: { items_qty },
            onMinicartOutsideClick,
            onMinicartButtonClick
        } = this.props;

        return (
            <ClickOutside onClick={ onMinicartOutsideClick } key="minicart">
                <div>
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'minicart' } }
                      onClick={ onMinicartButtonClick }
                      aria-label="Minicart"
                    >
                        <span aria-label="Items in cart">{ items_qty || '0' }</span>
                    </button>
                </div>
            </ClickOutside>
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
