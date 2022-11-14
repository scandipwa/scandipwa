/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import {
    createRef, KeyboardEvent, MouseEvent, PureComponent,
} from 'react';

import ClickOutside from 'Component/ClickOutside';
import CloseIcon from 'Component/CloseIcon';
import { Page } from 'Component/Header/Header.config';
import Loader from 'Component/Loader';
import SearchIcon from 'Component/SearchIcon';
import SearchOverlay from 'Component/SearchOverlay';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import { SearchFieldComponentProps } from './SearchField.type';

import './SearchField.style';

/** @namespace Component/SearchField/Component */
export class SearchFieldComponent extends PureComponent<SearchFieldComponentProps> {
    static defaultProps: Partial<SearchFieldComponentProps> = {
        isVisible: true,
        hideActiveOverlay: noopFn,
    };

    searchBarRef = createRef<HTMLInputElement>();

    __construct(props: SearchFieldComponentProps): void {
        super.__construct?.(props);

        this.closeSearch = this.closeSearch.bind(this);
        this.onSearchEnterPress = this.onSearchEnterPress.bind(this);
    }

    onClearSearchButtonClick(e: MouseEvent | null, isFocusOnSearchBar = true): void {
        const { onClearSearchButtonClick } = this.props;

        if (isFocusOnSearchBar) {
            this.searchBarRef.current?.focus();
        }

        onClearSearchButtonClick();
    }

    onSearchEnterPress(e: KeyboardEvent<HTMLInputElement>): void {
        const { searchCriteria, hideActiveOverlay, onSearchBarChange } = this.props;
        const search = encodeURIComponent(searchCriteria.trim().replace(/%/g, '%25'));
        const trimmedSearch = searchCriteria.trim();

        if (e.key === 'Enter' && trimmedSearch !== '') {
            history.push(appendWithStoreCode(`/search/${ search }`));
            hideActiveOverlay();
            onSearchBarChange({ target: { value: '' } });
            this.searchBarRef.current?.blur();
            this.closeSearch();
            scrollToTop();
        }
    }

    onIconClick(): void {
        this.searchBarRef.current?.focus();
    }

    openSearch(): void {
        const { onSearchBarFocus } = this.props;

        onSearchBarFocus();
    }

    closeSearch(): void {
        const { onSearchOutsideClick } = this.props;

        onSearchOutsideClick();
    }

    renderClearSearch(): ReactElement {
        const { isVisible } = this.props;

        return (
            <button
              block="Header"
              elem="Button"
              onClick={ this.onClearSearchButtonClick }
              mods={ {
                  type: 'searchClear',
                  isVisible,
              } }
              aria-label="Clear search"
            />
        );
    }

    renderOverlayFallback(): JSX.Element {
        return <Loader isLoading />;
    }

    renderSearch(): ReactElement {
        const {
            searchCriteria,
            onSearchBarFocus,
            onSearchBarChange,
            navigationState: { name },
        } = this.props;

        return (
            <div
              block="SearchField"
              elem="SearchInnerWrapper"
            >
                <input
                  id="search-field"
                  ref={ this.searchBarRef }
                  block="SearchField"
                  elem="Input"
                  onFocus={ onSearchBarFocus }
                  onChange={ onSearchBarChange }
                  onKeyDown={ this.onSearchEnterPress }
                  value={ searchCriteria }
                  mods={ { isActive: name === Page.SEARCH } }
                  placeholder={ __('Search products') }
                  autoComplete="off"
                  aria-label={ __('Search') }
                />
                { this.renderSearchIcon() }
                <SearchOverlay />
            </div>
        );
    }

    renderSearchIcon(): ReactElement {
        const { navigationState: { name } } = this.props;

        if (name === Page.SEARCH) {
            return (
                <div
                  block="SearchField"
                  elem="CloseIcon"
                  role="button"
                  tabIndex={ 0 }
                  onClick={ this.closeSearch }
                  aria-label={ __('Close') }
                >
                    <CloseIcon />
                </div>
            );
        }

        return (
            <div
              block="SearchField"
              elem="SearchIcon"
              role="button"
              tabIndex={ 0 }
              onClick={ this.openSearch }
              aria-label={ __('Search') }
            >
                <SearchIcon />
            </div>
        );
    }

    render(): ReactElement {
        const {
            isVisible,
            navigationState: { name },
        } = this.props;

        return (
            <div
              block="SearchField"
              mods={ {
                  isVisible,
                  isActive: name === Page.SEARCH,
              } }
            >
                <ClickOutside onClick={ this.closeSearch }>
                    <div block="SearchField" elem="Wrapper">
                        { this.renderSearch() }
                    </div>
                </ClickOutside>
            </div>
        );
    }
}

export default SearchFieldComponent;
