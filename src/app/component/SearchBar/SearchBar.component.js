import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from 'Component/Field';
import CartItem from 'Component/CartItem';
import CSS from 'Util/CSS';
import { ItemsType } from 'Type/ProductList';
import './SearchBar.style';

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

            this.timeout = setTimeout(() => {
                this.clearSearchResults();
                this.setTranslatePercentage(1);
            }, 0);
        } else {
            this.setTranslatePercentage(0);

            this.timeout = setTimeout(() => {
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
        const options = {
            search: searchInput
        };

        if (searchInput) {
            this.clearSearchResults();

            requestSearchBar(options);
            this.setState({ previousSearchInput: searchInput });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        document.activeElement.blur();
    }

    handleOutsideClick(event) {
        if (this.node.contains(event.target)) {
            return;
        }

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
              tabIndex="-1"
            >
                {
                    !isMobileSearchBarVisible
                        ? (
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                                <g>
                                    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                                        <path d="M3181,5042.9c-450.6-56-973.2-226.7-1343.9-442.6C232,3661.7-360,1653.9,
                                          482.6, 3.4c456-895.9,1263.9-1543.9,2237.1-1797.2c845.3-218.7,1831.8-88,
                                          2573.1,341.3l200, 117.3L7186-3023c1111.9-1106.6,1730.5-1703.9,
                                          1805.2-1741.2c274.6-136,472-93.3,706.6, 152c224,234.6,256,416,125.3,
                                          679.9c-37.3,
                                          74.7-624,682.6-1733.2,1791.8L6415.4-460.6l93.3, 146.7c578.6,901.2,711.9,
                                          2039.8, 354.7,3058.4c-397.3,1141.2-1391.9,2005.1-2581.1,2247.8C3967.6,
                                          5056.2,3469,5080.2,3181,5042.9z M4239.6,4085.6c831.9-221.3,1525.2-874.6,
                                          1794.5-1687.8c317.3-957.3,
                                          64-1973.2-666.6-2674.4c-1269.2-1218.6-3325-855.9-4103.6,722.6c-205.3,
                                          418.6-245.3,610.6-248,1133.2c0, 533.3,42.7,719.9,264,1159.9C1637.2,3451,
                                          2274.4,3944.3,3053,4115C3359.7,4184.3,3930.3,4168.3,4239.6,4085.6z"
                                        />
                                    </g>
                                </g>
                            </svg>
                        )
                        : (
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 47.971 47.971" xmlSpace="preserve" width="19px" height="19px">
                                <g>
                                    <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,
                                      0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                                      c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,
                                      18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                                      C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,
                                      47.091c0.586,0.586,1.354,0.879,2.121,0.879 s1.535-0.293,2.121-0.879c1.172-1.171,
                                      1.172-3.071,0-4.242L28.228,23.986z"
                                    />
                                </g>
                            </svg>
                        )
                }
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
            <p block="SearchBar" elem="NoResults">No products found!</p>
        );
    }

    renderResults(items) {
        return (
            <ul>
                {
                    items && items.map((product, key) => (
                        key < 20 && (
                            <CartItem
                              onItemClick={ () => this.onSearchItemClick() }
                              product={ product }
                              key={ product.id }
                            />
                        )
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
                    <span>Results for:</span>
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
    requestSearchBar: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    clearSearchResults: PropTypes.func.isRequired,
    products: ItemsType.isRequired
};

export default SearchBar;
