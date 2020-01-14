import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation';
import { TOP_NAVIGATION_TYPE, BOTTOM_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { toggleOverlayByKey, hideActiveOverlay } from 'Store/Overlay';
import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { isSignedIn } from 'Util/Auth';
import isMobile from 'Util/Mobile';
import { history } from 'Route';
// import { setQueryParams } from 'Util/Url';

import NavigationTabs from './NavigationTabs.component';
import { MENU, CUSTOMER_ACCOUNT } from 'Component/Header';

export const mapStateToProps = state => ({
    navigationState: state.NavigationReducer[BOTTOM_NAVIGATION_TYPE].navigationState,
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
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(BOTTOM_NAVIGATION_TYPE))
});

export class NavigationTabsContainer extends NavigationAbstractContainer {
    static propTypes = {
        // TODO: implement prop-types
    };

    containerFunctions = {
        onMenuButtonClick: this.onMenuButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onMinicartButtonClick: this.onMinicartButtonClick.bind(this)
    };

    containerProps = () => {
        // isDisabled: this._getIsDisabled()
    };

    onMenuButtonClick() {
        const {
            showOverlay,
            setHeaderState
        } = this.props;

        showOverlay(MENU);
        setHeaderState({ name: MENU });
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
            navigationState: { name }
        } = this.props;

        if (isSignedIn()) {
            history.push({ pathname: '/my-account/dashboard' });
            return;
        }

        showOverlay(CUSTOMER_ACCOUNT);
        setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Sign in' });
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
