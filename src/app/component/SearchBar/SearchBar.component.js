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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from 'Component/Field';
import CartItem from 'Component/CartItem';
import CSS from 'Util/CSS';
import { ItemsType } from 'Type/ProductList';
import './SearchBar.style';

/**
 * Search Bar
 * @class SearchBar
 */
class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previousSearchInput: '',
            searchInput: '',
            isSearchBarActive: false,
            isMobileSearchBarVisible: false
        };

        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.input = React.createRef();
        this.results = React.createRef();
    }

    onSearchItemClick() {
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.setTranslatePercentage(0);

        this.setState({
            isSearchBarActive: false,
            searchInput: '',
            previousSearchInput: '',
            isMobileSearchBarVisible: false
        });
    }

    setTranslatePercentage(value) {
        CSS.setVariable(
            this.input,
            'search-translate-percentage',
            `${value}`
        );
    }

    handleSearchIconClick() {
        const { isMobileSearchBarVisible } = this.state;

        this.setState({ searchInput: '', previousSearchInput: '' });

        if (!isMobileSearchBarVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
            this.setState({ isMobileSearchBarVisible: true });

            this.clearSearchResults();
            this.setTranslatePercentage(1);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.setTranslatePercentage(0);

            setTimeout(() => {
                this.clearSearchResults();
                this.setState({ isMobileSearchBarVisible: false });
            }, 150);
        }
    }

    handleClick() {
        const { isSearchBarActive } = this.state;

        if (!isSearchBarActive) {
            document.addEventListener('click', this.handleOutsideClick, false);
            this.setState({ isSearchBarActive: true });
        }
    }

    requestSearchBar() {
        const { requestSearchBar } = this.props;
        const { searchInput } = this.state;

        if (searchInput) {
            this.clearSearchResults();
            requestSearchBar({ search: searchInput });
            this.setState({ previousSearchInput: searchInput });
        }
    }

    handleSubmit(event) {
        const { history } = this.props;
        const { searchInput } = this.state;

        event.preventDefault();
        document.activeElement.blur();
        history.push(`/search/${encodeURIComponent(searchInput)}`);

        this.handleSearchIconClick();
    }

    handleOutsideClick({ target }) {
        if (this.node.contains(target)) {
            return;
        }

        document.removeEventListener('click', this.handleOutsideClick, false);
        this.setTranslatePercentage(0);

        setTimeout(() => {
            this.clearSearchResults();

            this.setState({
                isSearchBarActive: false,
                isMobileSearchBarVisible: false,
                searchInput: '',
                previousSearchInput: ''
            });
        }, 150);
    }


    handleChange(value) {
        const { previousSearchInput } = this.state;

        this.setState({ searchInput: value });

        clearTimeout(this.timeout);

        if (previousSearchInput !== value) {
            this.timeout = setTimeout(() => {
                this.requestSearchBar();
            }, 500);
        }
    }

    clearSearchResults() {
        const { clearSearchResults } = this.props;
        clearSearchResults();
    }

    renderIcon() {
        const { isMobileSearchBarVisible } = this.state;

        return (
            <div
              block="SearchBar"
              elem="Icon"
              mods={ { isVisible: isMobileSearchBarVisible } }
              onClick={ () => this.handleSearchIconClick() }
              onKeyDown={ () => this.handleKeyDown() }
              role="button"
              tabIndex="0"
            >
                <>
                    <span block="SearchBar" elem="Circle" mods={ { notVisible: isMobileSearchBarVisible } } />
                    <span block="SearchBar" elem="Handle" mods={ { visible: isMobileSearchBarVisible } } />
                </>
            </div>
        );
    }

    renderLoading() {
        return (
            <div
              block="SearchBar"
              elem="AnimationBlock"
            >
                <div />
                <div />
                <div />
            </div>
        );
    }

    renderNoResults() {
        return (
            <p block="SearchBar" elem="NoResults">{ __('No products found!') }</p>
        );
    }

    renderResults(items) {
        return (
            <ul>
                {
                    items && items.map(product => (
                        <CartItem
                          onItemClick={ () => this.onSearchItemClick() }
                          product={ product }
                          key={ product.id }
                        />
                    ))
                }
            </ul>
        );
    }

    renderHeader() {
        const { searchInput } = this.state;

        return (
            <div
              block="SearchBar"
              elem="Heading"
            >
                <h3>
                    <span>{ __('Results for:') }</span>
                    <span>{ searchInput }</span>
                </h3>
            </div>
        );
    }

    render() {
        const {
            isSearchBarActive,
            searchInput,
            isMobileSearchBarVisible,
            previousSearchInput
        } = this.state;

        const { isLoading } = this.props;
        const { products: items } = this.props;
        const isCurrentResultRequested = !!searchInput && searchInput === previousSearchInput;

        return (
            <div block="SearchBar" elem="Wrapper" ref={ (node) => { this.node = node; } }>
                <div
                  block="SearchBar"
                  mods={ { isVisible: isMobileSearchBarVisible, isActive: isSearchBarActive } }
                  ref={ this.input }
                >
                    <form onSubmit={ event => this.handleSubmit(event) }>
                        <Field
                          type="text"
                          id="HeaderInput"
                          placeholder="Type a new search"
                          onChange={ value => this.handleChange(value) }
                          onClick={ () => this.handleClick() }
                          isAutocompleteAllowed={ false }
                          value={ searchInput }
                        />
                        <article
                          block="SearchBar"
                          elem="Dropdown"
                          mods={ { hidden: !isSearchBarActive } }
                        >
                            { isCurrentResultRequested && (isLoading ? this.renderLoading() : this.renderHeader()) }
                            <div
                              block="SearchBar"
                              elem="Results"
                              mods={ { isLoaded: !isLoading && !!searchInput && isCurrentResultRequested } }
                              ref={ this.results }
                            >
                                { this.renderResults(items) }
                                { !items.length && this.renderNoResults() }
                            </div>
                        </article>
                    </form>
                </div>
                { this.renderIcon() }
            </div>
        );
    }
}

SearchBar.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    requestSearchBar: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    clearSearchResults: PropTypes.func.isRequired,
    products: ItemsType.isRequired
};

export default SearchBar;
