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

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from 'Route';
import { setQueryParams } from 'Util/Url';
import { isSignedIn } from 'Util/Auth';
import isMobile from 'Util/Mobile';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.component';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { toggleOverlayByKey, hideActiveOverlay } from 'Store/Overlay';
import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.component';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.component';
import Header, {
    PDP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    CUSTOMER_SUB_ACCOUNT,
    MENU,
    MENU_SUBCATEGORY,
    POPUP,
    SEARCH,
    CART,
    CART_OVERLAY,
    CMS_PAGE,
    CUSTOMER_ACCOUNT_PAGE,
    CHECKOUT
} from './Header.component';

export const mapStateToProps = state => ({
    navigationState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    cartTotals: state.CartReducer.cartTotals,
    header_logo_src: state.ConfigReducer.header_logo_src,
    isOffline: state.OfflineReducer.isOffline,
    logo_alt: state.ConfigReducer.logo_alt,
    isLoading: state.ConfigReducer.isLoading,
    activeOverlay: state.OverlayReducer.activeOverlay
});

export const mapDispatchToProps = dispatch => ({
    showOverlay: overlayKey => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: stateName => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

export const DEFAULT_HEADER_STATE = {
    name: DEFAULT_STATE_NAME,
    isHiddenOnMobile: true
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
        '/category': { name: CATEGORY, onBackClick: this.onMenuButtonClick.bind(this) },
        '/checkout': { name: CHECKOUT, onBackClick: () => history.push('/cart') },
        '/my-account': { name: CUSTOMER_ACCOUNT_PAGE, onBackClick: () => history.push('/') },
        '/product': { name: PDP, onBackClick: () => history.goBack() },
        '/cart': { name: CART },
        '/menu': { name: MENU },
        '/page': { name: CMS_PAGE, onBackClick: () => history.goBack() },
        '/': this.default_state
    };

    containerFunctions = {
        onBackButtonClick: this.onBackButtonClick.bind(this),
        onCloseButtonClick: this.onCloseButtonClick.bind(this),
        onSearchBarFocus: this.onSearchBarFocus.bind(this),
        onMenuButtonClick: this.onMenuButtonClick.bind(this),
        onClearSearchButtonClick: this.onClearSearchButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onSearchBarChange: this.onSearchBarChange.bind(this),
        onClearButtonClick: this.onClearButtonClick.bind(this),
        onEditButtonClick: this.onEditButtonClick.bind(this),
        onMinicartButtonClick: this.onMinicartButtonClick.bind(this),
        onOkButtonClick: this.onOkButtonClick.bind(this),
        onCancelButtonClick: this.onCancelButtonClick.bind(this),
        onSearchOutsideClick: this.onSearchOutsideClick.bind(this),
        onMenuOutsideClick: this.onMenuOutsideClick.bind(this),
        onMyAccountOutsideClick: this.onMyAccountOutsideClick.bind(this),
        onMinicartOutsideClick: this.onMinicartOutsideClick.bind(this),
        closeOverlay: this.closeOverlay.bind(this),
        onSignIn: this.onSignIn.bind(this),
        hideActiveOverlay: this.props.hideActiveOverlay
    };

    containerProps = () => {
        const {
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
            showMyAccountLogin: false,
            ...this.handleMobileRouteChange(history)
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

    onMenuButtonClick() {
        const {
            showOverlay,
            setNavigationState,
            navigationState: { name }
        } = this.props;

        if (isMobile.any()) {
            history.goBack();
            return;
        }

        if (name !== MENU) {
            showOverlay(MENU);
            setNavigationState({ name: MENU });
        }
    }

    onMenuOutsideClick() {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name }
        } = this.props;

        if (isMobile.any()) {
            return;
        }

        if (name === MENU || name === MENU_SUBCATEGORY) {
            if (name === MENU_SUBCATEGORY) {
                goToPreviousNavigationState();
            }
            goToPreviousNavigationState();
            hideActiveOverlay();
        }
    }

    onMyAccountButtonClick() {
        const {
            showOverlay,
            setNavigationState,
            navigationState: { name }
        } = this.props;

        if (isSignedIn()) {
            history.push({ pathname: '/my-account/dashboard' });
            return;
        }

        if (!isMobile.any() && name !== CUSTOMER_ACCOUNT) {
            showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
            setNavigationState({ name: CUSTOMER_ACCOUNT, title: 'Sign in' });
        }

        this.setState({ showMyAccountLogin: true });
    }

    onMyAccountOutsideClick() {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name }
        } = this.props;

        if (isMobile.any()
            || [CART_OVERLAY, MENU, POPUP].includes(name)
            || (!isMobile.any() && name === SEARCH)
        ) {
            return;
        }

        if (name === CUSTOMER_SUB_ACCOUNT) {
            goToPreviousNavigationState();
        }

        this.goToDefaultHeaderState();
        hideActiveOverlay();
    }

    closeOverlay() {
        const {
            navigationState: { name, title },
            goToPreviousNavigationState,
            setNavigationState
        } = this.props;
        const { location: { pathname } } = history;

        if (pathname.includes(CHECKOUT_URL)) {
            if (name === CUSTOMER_SUB_ACCOUNT) {
                goToPreviousNavigationState();
            } else {
                setNavigationState({ name: CHECKOUT, title });
            }

            this.setState({ showMyAccountLogin: false });
        }
    }

    onSignIn() {
        const { location: { pathname } } = history;

        if (pathname.includes(CHECKOUT_URL)) {
            this.setState({ showMyAccountLogin: false });
        }
    }

    onClearButtonClick() {
        const { hideActiveOverlay } = this.props;

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
    }

    onMinicartButtonClick() {
        const { showOverlay } = this.props;

        if (!isMobile.any()) {
            return showOverlay(CART_OVERLAY);
        }

        return history.push(`/${ CART }`);
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
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
