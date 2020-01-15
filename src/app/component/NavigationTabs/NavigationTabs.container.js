import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { TOP_NAVIGATION_TYPE, BOTTOM_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation';
import { toggleOverlayByKey, hideActiveOverlay } from 'Store/Overlay';
import { MENU, CUSTOMER_ACCOUNT, CART } from 'Component/Header';
import { isSignedIn } from 'Util/Auth';
import isMobile from 'Util/Mobile';
import { history } from 'Route';

import NavigationTabs from './NavigationTabs.component';

export const mapStateToProps = state => ({
    navigationState: state.NavigationReducer[BOTTOM_NAVIGATION_TYPE].navigationState,
    headerState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    cartTotals: state.CartReducer.cartTotals,
    header_logo_src: state.ConfigReducer.header_logo_src,
    logo_alt: state.ConfigReducer.logo_alt,
    isLoading: state.ConfigReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    showOverlay: overlayKey => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: stateName => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, stateName)),
    setHeaderState: stateName => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(BOTTOM_NAVIGATION_TYPE))
});

export class NavigationTabsContainer extends NavigationAbstractContainer {
    static propTypes = {
        // TODO: implement prop-types
    };

    containerFunctions = {
        onMenuButtonClick: this.onMenuButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onMinicartButtonClick: this.onMinicartButtonClick.bind(this),
        onHomeButtonClick: this.onHomeButtonClick.bind(this)
    };

    containerProps = () => {
        // isDisabled: this._getIsDisabled()
    };

    onMenuButtonClick() {
        const {
            showOverlay,
            setHeaderState,
            headerState: { name }
        } = this.props;

        if (name !== MENU) {
            showOverlay(MENU);
            setHeaderState({ name: MENU });
        }
    }

    onMinicartButtonClick() {
        const { showOverlay } = this.props;
        if (!isMobile.any()) return showOverlay(CART);
        return history.push('/cart');
    }

    onMyAccountButtonClick() {
        const {
            showOverlay,
            setHeaderState,
            headerState: { name }
        } = this.props;

        if (isSignedIn()) {
            history.push({ pathname: '/my-account/dashboard' });
            return;
        }

        if (name !== CUSTOMER_ACCOUNT) {
            showOverlay(CUSTOMER_ACCOUNT);
            setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Sign in' });
        }
    }

    onHomeButtonClick() {
        const { hideActiveOverlay } = this.props;
        const { pathname } = location;

        history.push('/');
        hideActiveOverlay();

        if (pathname === '/') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    render() {
        return (
            <NavigationTabs
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTabsContainer);
