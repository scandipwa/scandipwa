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

import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from 'Route';
import { changeHeaderState, goToPreviousHeaderState } from 'Store/Header';
import { toggleOverlayByKey, hideActiveOverlay } from 'Store/Overlay';
import { setQueryParams } from 'Util/Url';
import { isSignedIn } from 'Util/Auth';
import isMobile from 'Util/Mobile';
import Header, {
    PDP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    HOME_PAGE,
    MENU,
    MENU_SUBCATEGORY,
    SEARCH,
    CART,
    CMS_PAGE,
    FILTER,
    CART_EDITING,
    CHECKOUT,
    CUSTOMER_ACCOUNT_PAGE,
    POPUP
} from './Header.component';

export const mapStateToProps = state => ({
    headerState: state.HeaderReducer.headerState,
    cartTotals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = dispatch => ({
    showOverlay: overlayKey => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setHeaderState: stateName => dispatch(changeHeaderState(stateName)),
    goToPreviousHeaderState: () => dispatch(goToPreviousHeaderState())
});

export class HeaderContainer extends PureComponent {
    static propTypes = {
        showOverlay: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        headerState: PropTypes.shape({
            name: PropTypes.oneOf([
                PDP,
                CATEGORY,
                CUSTOMER_ACCOUNT,
                CUSTOMER_ACCOUNT_PAGE,
                HOME_PAGE,
                MENU,
                MENU_SUBCATEGORY,
                SEARCH,
                FILTER,
                CART,
                CART_EDITING,
                CHECKOUT,
                CMS_PAGE,
                POPUP
            ]),
            title: PropTypes.string,
            onBackClick: PropTypes.func,
            onCloseClick: PropTypes.func,
            onEditClick: PropTypes.func,
            onOkClick: PropTypes.func,
            onCancelClick: PropTypes.func
        }).isRequired
    };

    state = {
        prevPathname: '',
        searchCriteria: '',
        isClearEnabled: false
    };

    routeMap = {
        '/': { name: HOME_PAGE },
        '/category': { name: CATEGORY, onBackClick: () => history.push('/') },
        '/my-account': { name: CUSTOMER_ACCOUNT_PAGE, onBackClick: () => history.push('/') },
        '/product': { name: PDP, onBackClick: () => history.goBack() },
        '/cart': { name: CART },
        '/page': { name: CMS_PAGE, onBackClick: () => history.goBack() }
    };

    containerFunctions = {
        onBackButtonClick: this.onBackButtonClick.bind(this),
        onCloseButtonClick: this.onCloseButtonClick.bind(this),
        onSearchBarClick: this.onSearchBarClick.bind(this),
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

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            ...this.onRouteChanged(history.location, true)
        };
    }

    componentDidMount() {
        history.listen(history => this.setState(this.onRouteChanged(history)));
    }

    onRouteChanged(history, isPrevPathnameNotRelevant = false) {
        const newState = {};

        const {
            prevPathname
        } = this.state;

        const {
            hideActiveOverlay,
            setHeaderState,
            headerState: { name }
        } = this.props;

        const { pathname, search } = history;

        if (!isMobile.any()) {
            setHeaderState(this.routeMap['/']);
            hideActiveOverlay();

            return {};
        }

        newState.isClearEnabled = new RegExp(['customFilters', 'priceMax', 'priceMin'].join('|')).test(search);

        if ((isPrevPathnameNotRelevant || prevPathname !== pathname)) {
            const newHeaderState = Object.keys(this.routeMap).reduce(
                (state, route) => ((pathname.includes(route))
                    ? this.routeMap[route]
                    : state
                ), { name: HOME_PAGE }
            );

            if (name !== newHeaderState.name) {
                setHeaderState(newHeaderState);
            }

            hideActiveOverlay();

            newState.prevPathname = pathname;
        }

        return newState;
    }

    onBackButtonClick() {
        const { headerState: { onBackClick } } = this.props;

        this.setState({ searchCriteria: '' });

        if (onBackClick) onBackClick();
    }

    onCloseButtonClick() {
        const { hideActiveOverlay, goToPreviousHeaderState } = this.props;
        const { headerState: { onCloseClick } } = this.props;

        this.setState({ searchCriteria: '' });

        if (onCloseClick) onCloseClick();

        hideActiveOverlay();
        goToPreviousHeaderState();
    }

    onSearchOutsideClick() {
        const { goToPreviousHeaderState, hideActiveOverlay, headerState: { name } } = this.props;

        if (!isMobile.any() && name === SEARCH) {
            this.setState({ searchCriteria: '' });

            hideActiveOverlay();
            goToPreviousHeaderState();
        }
    }

    onSearchBarClick() {
        const {
            setHeaderState,
            goToPreviousHeaderState,
            showOverlay,
            headerState: { name }
        } = this.props;

        if (
            (!isMobile.any() && name === SEARCH)
            || (isMobile.any() && name !== MENU)
        ) return;

        showOverlay(SEARCH);

        setHeaderState({
            name: SEARCH,
            onBackClick: () => {
                showOverlay(MENU);
                goToPreviousHeaderState();
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
        const { showOverlay, setHeaderState, headerState: { name } } = this.props;

        if (name !== MENU) {
            showOverlay(MENU);
            setHeaderState({ name: MENU });
        }
    }

    onMenuOutsideClick() {
        const { goToPreviousHeaderState, hideActiveOverlay, headerState: { name } } = this.props;

        if (isMobile.any()) return;

        if (name === MENU || name === MENU_SUBCATEGORY) {
            if (name === MENU_SUBCATEGORY) goToPreviousHeaderState();
            goToPreviousHeaderState();
            hideActiveOverlay();
        }
    }

    onMyAccountButtonClick() {
        const {
            showOverlay, setHeaderState, headerState: { name }
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

    onMyAccountOutsideClick() {
        const { goToPreviousHeaderState, hideActiveOverlay, headerState: { name } } = this.props;

        if (isMobile.any() || name !== CUSTOMER_ACCOUNT) return;

        goToPreviousHeaderState();
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
        const { goToPreviousHeaderState, hideActiveOverlay, headerState: { name } } = this.props;

        if (isMobile.any() || name !== CART) return;

        goToPreviousHeaderState();
        hideActiveOverlay();
    }

    onEditButtonClick() {
        const { headerState: { onEditClick } } = this.props;

        if (onEditClick) onEditClick();
    }

    onOkButtonClick() {
        const { headerState: { onOkClick }, goToPreviousHeaderState } = this.props;

        if (onOkClick) onOkClick();
        goToPreviousHeaderState();
    }

    onCancelButtonClick() {
        const { headerState: { onCancelClick }, goToPreviousHeaderState } = this.props;

        if (onCancelClick) onCancelClick();
        goToPreviousHeaderState();
    }

    render() {
        return (
            <Header
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderContainer));
