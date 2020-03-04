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

import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import ClickOutside from 'Component/ClickOutside';
import SearchOverlay from 'Component/SearchOverlay';

import './SearchField.style';

class SearchField extends PureComponent {
    static propTypes = {
        searchCriteria: PropTypes.string,
        onSearchBarFocus: PropTypes.func.isRequired,
        onSearchBarChange: PropTypes.func.isRequired,
        onSearchOutsideClick: PropTypes.func.isRequired,
        onClearSearchButtonClick: PropTypes.func.isRequired,
        isVisible: PropTypes.bool,
        isActive: PropTypes.bool
    };

    static defaultProps = {
        isVisible: true,
        isActive: true,
        searchCriteria: ''
    };

    searchBarRef = createRef();

    state = {
        isPlaceholderVisible: true
    };

    static getDerivedStateFromProps(props) {
        const { isActive } = props;
        if (isActive) return null;
        return { isPlaceholderVisible: true };
    }

    onClearSearchButtonClick(isFocusOnSearchBar = true) {
        const { onClearSearchButtonClick } = this.props;
        if (isFocusOnSearchBar) this.searchBarRef.current.focus();
        onClearSearchButtonClick();
    }

    handleChange = (e) => {
        const { target: { value } } = e;
        const { onSearchBarChange } = this.props;
        onSearchBarChange(e);

        this.setState({ isPlaceholderVisible: value === '' });
    };

    clearSearch = () => {
        this.onClearSearchButtonClick(false);
    };

    renderClearSearch() {
        const { isVisible } = this.props;

        return (
            <button
              block="Header"
              elem="Button"
              onClick={ this.onClearSearchButtonClick }
              mods={ {
                  type: 'searchClear',
                  isVisible
              } }
              aria-label="Clear search"
            />
        );
    }

    renderContent() {
        const {
            searchCriteria,
            onSearchBarFocus,
            isActive
        } = this.props;

        const { isPlaceholderVisible } = this.state;

        return (
            <>
                <input
                  id="search-field"
                  ref={ this.searchBarRef }
                  block="SearchField"
                  elem="Input"
                  onFocus={ onSearchBarFocus }
                  onChange={ this.handleChange }
                  value={ searchCriteria }
                  mods={ { isActive } }
                  autoComplete="off"
                />
                <div
                  block="SearchField"
                  elem="Placeholder"
                  mods={ {
                      isActive,
                      isPlaceholderVisible
                  } }
                >
                    <span>{ __('Search') }</span>
                </div>
            </>
        );
    }

    render() {
        const {
            onSearchOutsideClick,
            searchCriteria,
            isVisible,
            isActive
        } = this.props;

        return (
            <div block="SearchField" mods={ { isVisible, isActive } }>
                <ClickOutside onClick={ onSearchOutsideClick }>
                    <div block="SearchField" elem="Wrapper">
                        { this.renderContent() }
                        <SearchOverlay clearSearch={ this.clearSearch } searchCriteria={ searchCriteria } />
                    </div>
                </ClickOutside>
            </div>
        );
    }
}

export default SearchField;
