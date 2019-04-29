/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { history } from 'Route';
import MenuOverlay from 'Component/MenuOverlay';
import SearchOverlay from 'Component/SearchOverlay';
import MyAccountOverlay from 'Component/MyAccountOverlay';
import { setQueryParams } from 'Util/Url';
import './Header.style';

export const PDP = 'pdp';
export const CATEGORY = 'category';
export const CUSTOMER_ACCOUNT = 'customer_account';
export const HOME_PAGE = 'home';
export const MENU = 'menu';
export const MENU_SUBCATEGORY = 'menu_subcategory';
export const SEARCH = 'search';
export const FILTER = 'filter';

export const NAVIGATION_BACK = 'back';
export const NAVIGATION_CLOSE = 'close';
export const NAVIGATION_BOTH = 'both';
export const NAVIGATION_NONE = 'none';

class Header extends Component {
    constructor(props) {
        super(props);

        this.routeMap = {
            '/': { name: HOME_PAGE },
            '/category': { name: CATEGORY, onBackClick: () => window.history.pushState({}, '', '/') },
            '/product': { name: PDP, onBackClick: () => window.history.back() }
        };

        this.stateMap = {
            [PDP]: {
                back: true,
                title: true,
                minicart: true
            },
            [CATEGORY]: {
                back: true,
                menu: true,
                title: true,
                minicart: true
            },
            [CUSTOMER_ACCOUNT]: {
                close: true,
                title: true
            },
            [HOME_PAGE]: {
                menu: true,
                title: true,
                account: true,
                minicart: true,
                logo: true
            },
            [MENU]: {
                close: true,
                search: true
            },
            [MENU_SUBCATEGORY]: {
                back: true,
                title: true
            },
            [SEARCH]: {
                back: true,
                search: true,
                searchClear: true
            },
            [FILTER]: {
                close: true,
                clear: true,
                title: true
            }
        };

        this.state = {
            searchCriteria: '',
            prevPathname: ''
        };

        this.searchBarRef = React.createRef();

        this.onBackButtonClick = this.onBackButtonClick.bind(this);
        this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
        this.renderHeaderState = this.renderHeaderState.bind(this);
        this.onSearchBarClick = this.onSearchBarClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onClearSearchButtonClick = this.onClearSearchButtonClick.bind(this);
        this.onMyAccountButtonClick = this.onMyAccountButtonClick.bind(this);
        this.onSearchBarChange = this.onSearchBarChange.bind(this);
        this.onClearButtonClick = this.onClearButtonClick.bind(this);
    }

    componentDidMount() {
        this.onRouteChanged(history.location, true);
        history.listen(history => this.onRouteChanged(history));
    }

    onRouteChanged(history, isPrevPathnameNotRelevant = false) {
        const { prevPathname } = this.state;

        const {
            hideActiveOverlay,
            setHeaderState,
            headerState: { name }
        } = this.props;

        const { pathname } = history;

        if (isPrevPathnameNotRelevant || prevPathname !== pathname) {
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

            this.setState({ prevPathname: pathname });
        }
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

    onSearchBarClick() {
        const {
            setHeaderState,
            goToPreviousHeaderState,
            showOverlay,
            headerState: { name }
        } = this.props;

        if (name !== SEARCH) {
            showOverlay(SEARCH);
            setHeaderState({
                name: SEARCH,
                onBackClick: () => {
                    showOverlay(MENU);
                    goToPreviousHeaderState();
                }
            });
        }
    }

    onSearchBarChange({ target: { value: searchCriteria } }) {
        this.setState({ searchCriteria });
    }

    onClearSearchButtonClick() {
        this.setState({ searchCriteria: '' });
        this.searchBarRef.current.focus();
    }

    onMenuButtonClick() {
        const { showOverlay, setHeaderState } = this.props;

        showOverlay(MENU);
        setHeaderState({ name: MENU });
    }

    onMyAccountButtonClick() {
        const { showOverlay, setHeaderState } = this.props;

        showOverlay(CUSTOMER_ACCOUNT);
        setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Sign in' });
    }

    onClearButtonClick() {
        setQueryParams({ customFilters: '' }, history.location, history);
    }

    renderBackButton(isVisible = false) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { type: 'back', isVisible } }
              onClick={ this.onBackButtonClick }
              aria-label="Go back"
            />
        );
    }

    renderCloseButton(isVisible = false) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { type: 'close', isVisible } }
              onClick={ this.onCloseButtonClick }
              aria-label="Close"
            />
        );
    }

    renderMenuButton(isVisible = false) {
        return (
            <>
                <button
                  block="Header"
                  elem="Button"
                  mods={ { isVisible, type: 'menu' } }
                  aria-label="Go to menu and search"
                  onClick={ this.onMenuButtonClick }
                />
                <MenuOverlay />
            </>
        );
    }

    renderSearchField(isSearchVisible = false, isSearchClearVisible = false) {
        const { searchCriteria } = this.state;

        return (
            <>
                <div block="Header" elem="SearchWrapper">
                    <input
                      ref={ this.searchBarRef }
                      placeholder="Search"
                      aria-label="Search field"
                      block="Header"
                      elem="SearchField"
                      onClick={ this.onSearchBarClick }
                      onChange={ this.onSearchBarChange }
                      value={ searchCriteria }
                      mods={ {
                          isVisible: isSearchVisible,
                          type: 'searchField'
                      } }
                    />
                </div>
                <button
                  block="Header"
                  elem="Button"
                  onClick={ this.onClearSearchButtonClick }
                  mods={ {
                      type: 'searchClear',
                      isVisible: isSearchClearVisible
                  } }
                  aria-label="Clear search"
                />
                <SearchOverlay searchCriteria={ searchCriteria } />
            </>
        );
    }

    renderTitle(isVisible = false) {
        const { headerState: { title } } = this.props;

        return (
            <>
                <h2 block="Header" elem="Title" mods={ { isVisible } }>{ title }</h2>
            </>
        );
    }

    renderLogo(isVisible = false) {
        return (
            <Link to="/" className={ `Header-Logo ${ isVisible && 'Header-Logo_isVisible' }` }>
                <svg xmlns="http://www.w3.org/2000/svg" width="116" height="17">
                    <g fill="none" fillRule="nonzero">
                        <path fill="#F26323" d="M84.38 15.94l-.07-.16-2.15-3.23-.05-.08 2.26-6.08 2.5 4.35 3.57-9.57h3.45l3.28 9.49h.07l.06-.1 4.56-9.37.02-.02h4.46l-.06.16-2.09 4.54-2.25 4.9-2.3 4.97-.06.2h-4.49l-.04-.23-1.51-4.23-1.46-4.08a.44.44 0 0 0-.12.19l-.6 1.6-1.88 5-.66 1.75h-4.44zm-9.53-7.95l.15.02h1.48c.37-.02.75-.03 1.11-.1.7-.15 1.19-.5 1.4-1.1.22-.56.22-1.12-.02-1.68-.2-.44-.54-.75-1.04-.92a4.1 4.1 0 0 0-1.25-.2H75l-.15.02v3.96zm-4.28 7.95V1.17l.13-.01h7.08c.88 0 1.74.13 2.56.43.94.34 1.7.9 2.26 1.67l-2.72 7.34c-.25.09-.5.12-.76.16-.5.08-1.01.09-1.52.09h-2.75l-.02.25v4.84h-4.26zm40.13 0l-.04-.17-1-2.43-.04-.05-.24-.01h-5.8l1.3-2.86h3.73l-1.77-4.35 2.2-4.9.24.56 3.23 7.5 2.78 6.47.11.2c0 .01 0 .04-.02.04h-4.68z"/>
                        <path fill="#505865" d="M2.6 1.89A6.97 6.97 0 0 1 6.68.77c1.97 0 3.65.4 5.06 1.18v3.58A7.54 7.54 0 0 0 7 4.16c-1.27 0-1.91.33-1.91.94 0 .3.2.56.58.8a6 6 0 0 0 1.45.58c1.32.37 2.58.9 3.78 1.56a4.16 4.16 0 0 1 2.03 3.6c0 3.01-2 4.52-6.02 4.52a12 12 0 0 1-5.8-1.35v-3.69a9.62 9.62 0 0 0 5.5 1.67c.8 0 1.37-.08 1.72-.23.34-.14.51-.4.51-.77s-.27-.7-.8-.99c-.63-.32-1.29-.58-1.96-.79a23.7 23.7 0 0 1-2.3-.87A5.03 5.03 0 0 1 1.8 7.6 3.92 3.92 0 0 1 1 5.12c0-1.4.53-2.48 1.6-3.22M15.81 6.8a6.5 6.5 0 0 1 4.2-1.4c1.14 0 2.2.22 3.2.69v3.05c-.8-.46-1.7-.7-2.63-.7-.8 0-1.46.2-1.98.58-.52.38-.78.97-.78 1.77 0 .76.26 1.33.78 1.72.52.4 1.15.6 1.91.6 1.07 0 2-.23 2.8-.68v3.06a9.31 9.31 0 0 1-3.55.67 6.3 6.3 0 0 1-4.04-1.32c-1.1-.87-1.66-2.16-1.66-3.84 0-1.86.58-3.25 1.75-4.2M28.62 13.45c.23.2.53.29.9.29.65 0 1.22-.18 1.7-.53v-1.37c-.42-.13-.87-.2-1.31-.2-1.1 0-1.64.38-1.64 1.1 0 .28.13.54.35.71m6.97.14c.14 0 .28-.02.41-.07v2.22a5.1 5.1 0 0 1-1.85.31c-1.15 0-1.97-.37-2.45-1.11a5.74 5.74 0 0 1-3.6 1.22 3.91 3.91 0 0 1-2.56-.84 2.78 2.78 0 0 1-1.03-2.28c0-.6.13-1.14.4-1.59.26-.44.64-.8 1.1-1.04.44-.24.92-.42 1.41-.53a7 7 0 0 1 1.56-.17c.78 0 1.53.08 2.24.23v-.36c0-.38-.18-.68-.55-.91-.36-.23-.9-.35-1.6-.35-1.09 0-2.3.26-3.62.78V6.08a13.2 13.2 0 0 1 4.03-.67c1.76 0 3.1.36 4.02 1.07.92.72 1.38 1.94 1.38 3.65v2.82c0 .43.24.64.71.64M43.84 5.41c1.34 0 2.37.4 3.07 1.17.7.78 1.06 1.78 1.06 2.99v6.28H44.3v-5.8c0-.52-.14-.91-.43-1.18a1.6 1.6 0 0 0-1.14-.4c-.7 0-1.3.3-1.77.88v6.5H37.3V5.73h3.23v1.16a4.4 4.4 0 0 1 3.3-1.48M56.79 8.73a2.26 2.26 0 0 0-1.27-.37c-.72 0-1.27.24-1.65.72a2.66 2.66 0 0 0-.57 1.7c0 .67.19 1.24.57 1.71.38.48.93.72 1.65.72.45 0 .9-.12 1.27-.37.37-.24.64-.54.81-.9v-2.3a2.28 2.28 0 0 0-.81-.9v-.01zm4.47-7.64v14.75h-3.23v-1.37a3.3 3.3 0 0 1-1.32 1.2c-.6.33-1.32.5-2.18.5-.84 0-1.58-.16-2.24-.47a4.07 4.07 0 0 1-1.57-1.25 5.86 5.86 0 0 1-1.19-3.66c0-1.32.42-2.6 1.19-3.67.38-.52.9-.94 1.57-1.24.66-.31 1.4-.47 2.24-.47 1.3 0 2.33.38 3.07 1.14V1.09h3.66zM63.47 15.84h3.66V5.73h-3.66v10.11zM66.8 3.8c-.4.33-.9.5-1.5.5s-1.1-.17-1.5-.5c-.39-.33-.58-.83-.58-1.49 0-.64.2-1.13.6-1.46.4-.33.9-.5 1.48-.5.6 0 1.1.17 1.5.5.4.33.6.82.6 1.46 0 .66-.2 1.16-.6 1.49z"/>
                    </g>
                </svg>
            </Link>
        );
    }

    renderAccountButton(isVisible = false) {
        return (
            <>
                <button
                  block="Header"
                  elem="Button"
                  mods={ { isVisible, type: 'account' } }
                  onClick={ this.onMyAccountButtonClick }
                  aria-label="My account"
                />
                <MyAccountOverlay />
            </>
        );
    }

    renderMinicartButton(isVisible = false) {
        const { cartItemQuantity } = this.props;

        return (
            <button
              block="Header"
              elem="Button"
              mods={ { isVisible, type: 'minicart' } }
              aria-label="Minicart"
            >
                <span>{ cartItemQuantity }</span>
            </button>
        );
    }

    renderClearButton(isVisible = false) {
        return (
            <button
              block="Header"
              elem="Button"
              mods={ { type: 'clear', isVisible } }
              onClick={ this.onClearButtonClick }
              aria-label="Clear"
            />
        );
    }

    renderHeaderState(state) {
        const source = this.stateMap[state]
            ? this.stateMap[state]
            : this.stateMap[HOME_PAGE];

        const {
            back,
            close,
            title,
            minicart,
            account,
            menu,
            logo,
            search,
            searchClear,
            clear
        } = source;

        return (
            <>
                { this.renderBackButton(back) }
                { this.renderCloseButton(close) }
                { this.renderMenuButton(menu) }
                { this.renderSearchField(search, searchClear) }
                { this.renderTitle(title) }
                { this.renderLogo(logo) }
                { this.renderAccountButton(account) }
                { this.renderMinicartButton(minicart) }
                { this.renderClearButton(clear) }
            </>
        );
    }

    render() {
        const { headerState: { name } } = this.props;

        return (
            <header block="Header">
                <nav block="Header" elem="Nav">
                    { this.renderHeaderState(name) }
                </nav>
            </header>
        );
    }
}

Header.propTypes = {
    showOverlay: PropTypes.func.isRequired,
    goToPreviousHeaderState: PropTypes.func.isRequired,
    hideActiveOverlay: PropTypes.func.isRequired,
    setHeaderState: PropTypes.func.isRequired,
    headerState: PropTypes.shape({
        name: PropTypes.oneOf([
            PDP,
            CATEGORY,
            CUSTOMER_ACCOUNT,
            HOME_PAGE,
            MENU,
            MENU_SUBCATEGORY,
            SEARCH,
            FILTER
        ]),
        title: PropTypes.string,
        onBackClick: PropTypes.func,
        onCloseClick: PropTypes.func
    }).isRequired,
    cartItemQuantity: PropTypes.number
};

Header.defaultProps = {
    cartItemQuantity: 0
};

export default Header;
