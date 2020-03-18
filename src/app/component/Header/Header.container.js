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

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.component';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.component';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { toggleOverlayByKey, hideActiveOverlay } from 'Store/Overlay';
import { setQueryParams } from 'Util/Url';
import { isSignedIn } from 'Util/Auth';
import isMobile from 'Util/Mobile';
import { history } from 'Route';

import Header, {
    PDP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    CUSTOMER_SUB_ACCOUNT,
    MENU,
    MENU_SUBCATEGORY,
    SEARCH,
    CART,
    CMS_PAGE,
    CUSTOMER_ACCOUNT_PAGE,
    CHECKOUT
} from './Header.component';

export const mapStateToProps = state => ({
    navigationState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    cartTotals: state.CartReducer.cartTotals,
    header_logo_src: state.ConfigReducer.header_logo_src,
    logo_alt: state.ConfigReducer.logo_alt,
    isLoading: state.ConfigReducer.isLoading
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
        onMinicartOutsideClick: this.onMinicartOutsideClick.bind(this)
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
            searchCriteria
        } = this.state;

        return {
            navigationState,
            cartTotals,
            header_logo_src,
            logo_alt,
            isLoading,
            isClearEnabled,
            searchCriteria
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            prevPathname: '',
            searchCriteria: '',
            isClearEnabled: this.getIsClearEnabled()
        };
    }

    componentDidMount() {
        this.handleHeaderVisibility();
        super.componentDidMount();
    }

    componentDidUpdate() {
        this.handleHeaderVisibility();
    }

    handleHeaderVisibility() {
        const { navigationState: { isHiddenOnMobile } } = this.props;

        if (isHiddenOnMobile) {
            document.body.classList.add('hiddenHeader');
            return;
        }

        document.body.classList.remove('hiddenHeader');
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

    onBackButtonClick() {
        const { navigationState: { onBackClick } } = this.props;

        this.setState({ searchCriteria: '' });

        if (onBackClick) onBackClick();
    }

    onCloseButtonClick() {
        const { hideActiveOverlay, goToPreviousNavigationState } = this.props;
        const { navigationState: { onCloseClick } } = this.props;

        this.setState({ searchCriteria: '' });

        if (onCloseClick) onCloseClick();

        hideActiveOverlay();
        goToPreviousNavigationState();
    }

    onSearchOutsideClick() {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name }
        } = this.props;

        if (!isMobile.any() && name === SEARCH) {
            this.setState({ searchCriteria: '' });

            hideActiveOverlay();
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
        ) return;

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

        if (isMobile.any()) return;

        if (name === MENU || name === MENU_SUBCATEGORY) {
            if (name === MENU_SUBCATEGORY) goToPreviousNavigationState();
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

        if (name !== CUSTOMER_ACCOUNT) {
            showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
            setNavigationState({ name: CUSTOMER_ACCOUNT, title: 'Sign in' });
        }
    }

    onMyAccountOutsideClick() {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name }
        } = this.props;

        if (
            isMobile.any()
            || !(name === CUSTOMER_ACCOUNT || name === CUSTOMER_SUB_ACCOUNT)
        ) return;
        if (name === CUSTOMER_SUB_ACCOUNT) goToPreviousNavigationState();
        goToPreviousNavigationState();
        hideActiveOverlay();
    }

    onClearButtonClick() {
        setQueryParams({ customFilters: '', priceMax: '', priceMin: '' }, history.location, history);
        this.setState({ isClearEnabled: false });
    }

    onMinicartButtonClick() {
        const { showOverlay } = this.props;

        if (!isMobile.any()) return showOverlay(CART);

        return history.push('/cart');
    }

    onMinicartOutsideClick() {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name }
        } = this.props;

        if (isMobile.any() || name !== CART) return;

        goToPreviousNavigationState();
        hideActiveOverlay();
    }

    onEditButtonClick() {
        const { navigationState: { onEditClick } } = this.props;

        if (onEditClick) onEditClick();
    }

    onOkButtonClick() {
        const {
            navigationState: { onOkClick },
            goToPreviousNavigationState
        } = this.props;

        if (onOkClick) onOkClick();
        goToPreviousNavigationState();
    }

    onCancelButtonClick() {
        const {
            navigationState: { onCancelClick },
            goToPreviousNavigationState
        } = this.props;

        if (onCancelClick) onCancelClick();
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
