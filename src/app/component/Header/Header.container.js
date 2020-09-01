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
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import isMobile from 'Util/Mobile';
import { appendWithStoreCode, setQueryParams } from 'Util/Url';

import Header from './Header.component';
import {
    CART,
    CART_OVERLAY, CATEGORY,
    CHECKOUT, CHECKOUT_ACCOUNT,
    CMS_PAGE, CUSTOMER_ACCOUNT,
    CUSTOMER_ACCOUNT_PAGE, CUSTOMER_SUB_ACCOUNT,
    MENU, PDP,
    SEARCH
} from './Header.config';

export const mapStateToProps = (state) => ({
    navigationState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    cartTotals: state.CartReducer.cartTotals,
    header_logo_src: state.ConfigReducer.header_logo_src,
    isOffline: state.OfflineReducer.isOffline,
    logo_alt: state.ConfigReducer.logo_alt,
    isLoading: state.ConfigReducer.isLoading,
    activeOverlay: state.OverlayReducer.activeOverlay
});

export const mapDispatchToProps = (dispatch) => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

export const DEFAULT_HEADER_STATE = {
    name: DEFAULT_STATE_NAME,
    isHiddenOnMobile: false
};

export class HeaderContainer extends NavigationAbstractContainer {
    static propTypes = {
        showOverlay: PropTypes.func.isRequired,
        goToPreviousNavigationState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        header_logo_src: PropTypes.string
    };

    static defaultProps = {
        header_logo_src: ''
    };

    default_state = DEFAULT_HEADER_STATE;

    routeMap = {
        '/account/confirm': { name: CMS_PAGE, title: __('Confirm account'), onBackClick: () => history.push('/') },
        '/category': { name: CATEGORY },
        '/checkout': { name: CHECKOUT, onBackClick: () => history.push('/cart') },
        '/my-account': { name: CUSTOMER_ACCOUNT_PAGE, onBackClick: () => history.push('/') },
        '/product': { name: PDP, onBackClick: () => history.goBack() },
        '/cart': { name: CART },
        '/menu': { name: MENU },
        '/page': { name: CMS_PAGE, onBackClick: () => history.goBack() },
        '/': { name: DEFAULT_STATE_NAME, isHiddenOnMobile: true }
    };

    containerFunctions = {
        onBackButtonClick: this.onBackButtonClick.bind(this),
        onCloseButtonClick: this.onCloseButtonClick.bind(this),
        onSearchBarFocus: this.onSearchBarFocus.bind(this),
        onClearSearchButtonClick: this.onClearSearchButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onSearchBarChange: this.onSearchBarChange.bind(this),
        onClearButtonClick: this.onClearButtonClick.bind(this),
        onEditButtonClick: this.onEditButtonClick.bind(this),
        onMinicartButtonClick: this.onMinicartButtonClick.bind(this),
        onOkButtonClick: this.onOkButtonClick.bind(this),
        onCancelButtonClick: this.onCancelButtonClick.bind(this),
        onSearchOutsideClick: this.onSearchOutsideClick.bind(this),
        onMyAccountOutsideClick: this.onMyAccountOutsideClick.bind(this),
        onMinicartOutsideClick: this.onMinicartOutsideClick.bind(this),
        onSignIn: this.onSignIn.bind(this),
        hideActiveOverlay: this.props.hideActiveOverlay
    };

    containerProps = () => {
        const {
            activeOverlay,
            navigationState,
            cartTotals,
            header_logo_src,
            logo_alt,
            isLoading
        } = this.props;

        const {
            isClearEnabled,
            searchCriteria,
            showMyAccountLogin
        } = this.state;

        const {
            location: {
                pathname
            }
        } = history;

        const isCheckout = pathname.includes(CHECKOUT_URL);

        return {
            activeOverlay,
            navigationState,
            cartTotals,
            header_logo_src,
            logo_alt,
            isLoading,
            isClearEnabled,
            searchCriteria,
            isCheckout,
            showMyAccountLogin
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            prevPathname: '',
            searchCriteria: '',
            isClearEnabled: this.getIsClearEnabled(),
            showMyAccountLogin: false
        };
    }

    componentDidMount() {
        this.handleHeaderVisibility();
        super.componentDidMount();
    }

    componentDidUpdate(prevProps) {
        this.hideSearchOnStateChange(prevProps);
        this.handleHeaderVisibility();
    }

    getNavigationState() {
        const { navigationState } = this.props;

        const { pathname } = location;
        const { state: historyState } = window.history || {};
        const { state = {} } = historyState || {};

        // TODO: something here breaks /<STORE CODE> from being opened, and / when, the url-based stores are enabled.

        const activeRoute = Object.keys(this.routeMap)
            .find((route) => (
                route !== '/'
                || pathname === appendWithStoreCode('/')
                || pathname === '/'
            ) && pathname.includes(route));

        if (state.category || state.product || state.page || state.popupOpen) { // keep state if it category is in state
            return navigationState;
        }

        return this.routeMap[activeRoute] || this.default_state;
    }

    hideSearchOnStateChange(prevProps) {
        const { navigationState: { name: prevName } } = prevProps;
        const { navigationState: { name } } = this.props;

        if (prevName === SEARCH && prevName !== name) {
            this.hideSearchOverlay();
        }
    }

    hideSearchOverlay() {
        const { hideActiveOverlay, activeOverlay } = this.props;

        this.setState({ searchCriteria: '' });

        document.activeElement.blur();

        if (activeOverlay === SEARCH) {
            hideActiveOverlay();
        }
    }

    handleHeaderVisibility() {
        const { navigationState: { isHiddenOnMobile } } = this.props;

        if (isHiddenOnMobile) {
            document.documentElement.classList.add('hiddenHeader');
            return;
        }

        document.documentElement.classList.remove('hiddenHeader');
    }

    handleMobileUrlChange(history) {
        const { prevPathname } = this.state;
        const { pathname } = history;
        const isClearEnabled = this.getIsClearEnabled();

        if (prevPathname === pathname) {
            return { isClearEnabled };
        }

        return {
            isClearEnabled,
            showMyAccountLogin: false
        };
    }

    getIsClearEnabled() {
        const { location: { search } } = history;

        return new RegExp([
            'customFilters',
            'priceMax',
            'priceMin'
        ].join('|')).test(search);
    }

    onBackButtonClick(e) {
        const { navigationState: { onBackClick } } = this.props;

        this.setState({ searchCriteria: '' });

        if (onBackClick) {
            onBackClick(e);
        }
    }

    onCloseButtonClick(e) {
        const { hideActiveOverlay, goToPreviousNavigationState } = this.props;
        const { navigationState: { onCloseClick } } = this.props;

        this.setState({ searchCriteria: '' });

        if (onCloseClick) {
            onCloseClick(e);
        }

        hideActiveOverlay();
        goToPreviousNavigationState();
    }

    onSearchOutsideClick() {
        const { goToPreviousNavigationState, navigationState: { name } } = this.props;

        if (!isMobile.any() && name === SEARCH) {
            this.hideSearchOverlay();
            goToPreviousNavigationState();
        }
    }

    onSearchBarFocus() {
        const {
            setNavigationState,
            goToPreviousNavigationState,
            showOverlay,
            navigationState: { name }
        } = this.props;

        if (
            (!isMobile.any() && name === SEARCH)
            || (isMobile.any() && name !== MENU)
        ) {
            return;
        }

        showOverlay(SEARCH);

        setNavigationState({
            name: SEARCH,
            onBackClick: () => {
                showOverlay(MENU);
                goToPreviousNavigationState();
            }
        });
    }

    onSearchBarChange({ target: { value: searchCriteria } }) {
        this.setState({ searchCriteria });
    }

    onClearSearchButtonClick() {
        this.setState({ searchCriteria: '' });
    }

    onMyAccountButtonClick() {
        const {
            showOverlay,
            setNavigationState
        } = this.props;

        if (isSignedIn()) {
            history.push({ pathname: '/my-account/dashboard' });
            return;
        }

        this.setState({ showMyAccountLogin: true }, () => {
            showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
            setNavigationState({
                name: CHECKOUT_ACCOUNT,
                title: 'Sign in',
                onCloseClick: this.closeOverlay
            });
        });
    }

    onMyAccountOutsideClick() {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name }
        } = this.props;

        if (isMobile.any() || ![CUSTOMER_ACCOUNT, CUSTOMER_SUB_ACCOUNT, CHECKOUT_ACCOUNT].includes(name)) {
            return;
        }

        if (name === CUSTOMER_SUB_ACCOUNT) {
            goToPreviousNavigationState();
        }

        this.goToDefaultHeaderState();
        hideActiveOverlay();
    }

    closeOverlay = () => {
        const { location: { pathname } } = history;

        if (pathname.includes(CHECKOUT_URL)) {
            this.setState({ showMyAccountLogin: false });
        }
    };

    onSignIn() {
        const { location: { pathname } } = history;

        if (pathname.includes(CHECKOUT_URL)) {
            this.setState({ showMyAccountLogin: false });
        }
    }

    onClearButtonClick() {
        const {
            hideActiveOverlay,
            goToPreviousNavigationState
        } = this.props;

        setQueryParams(
            {
                customFilters: '',
                priceMax: '',
                priceMin: ''
            },
            history.location,
            history
        );

        this.setState({ isClearEnabled: false });

        hideActiveOverlay();
        goToPreviousNavigationState();
    }

    onMinicartButtonClick() {
        const {
            showOverlay,
            navigationState: { name }
        } = this.props;

        if (name === CART_OVERLAY) {
            return;
        }

        if (!isMobile.any()) {
            this.setState({ shouldRenderCartOverlay: true });

            showOverlay(CART_OVERLAY);
            return;
        }

        history.push(`/${ CART }`);
    }

    onMinicartOutsideClick() {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name }
        } = this.props;

        if (isMobile.any() || name !== CART_OVERLAY) {
            return;
        }

        goToPreviousNavigationState();
        hideActiveOverlay();
    }

    onEditButtonClick(e) {
        const { navigationState: { onEditClick } } = this.props;

        if (onEditClick) {
            onEditClick(e);
        }
    }

    onOkButtonClick(e) {
        const {
            navigationState: { onOkClick },
            goToPreviousNavigationState
        } = this.props;

        if (onOkClick) {
            onOkClick(e);
        }

        goToPreviousNavigationState();
    }

    onCancelButtonClick() {
        const {
            navigationState: { onCancelClick },
            goToPreviousNavigationState
        } = this.props;

        if (onCancelClick) {
            onCancelClick();
        }

        goToPreviousNavigationState();
    }

    render() {
        return (
            <Header
              { ...this.state }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
