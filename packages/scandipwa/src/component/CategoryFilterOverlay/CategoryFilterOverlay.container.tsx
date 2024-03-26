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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { ProductAttributeFilterOptions } from 'Query/ProductList.type';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { ReactElement } from 'Type/Common.type';
import CSS from 'Util/CSS';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { getQueryParam, setQueryParams } from 'Util/Url';

import CategoryFilterOverlay from './CategoryFilterOverlay.component';
import { KEY_PRICE } from './CategoryFilterOverlay.config';
import {
    CategoryFilterComponentContainerPropsKey,
    CategoryFilterOverlayComponentProps,
    CategoryFilterOverlayContainerFunctions,
    CategoryFilterOverlayContainerMapDispatchProps,
    CategoryFilterOverlayContainerMapStateProps,
    CategoryFilterOverlayContainerProps,
} from './CategoryFilterOverlay.type';

/** @namespace Component/CategoryFilterOverlay/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CategoryFilterOverlayContainerMapStateProps => ({
    isInfoLoading: state.ProductListInfoReducer.isLoading,
    isProductsLoading: state.ProductListReducer.isLoading,
    totalPages: state.ProductListReducer.totalPages,
});

/** @namespace Component/CategoryFilterOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CategoryFilterOverlayContainerMapDispatchProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(NavigationType.BOTTOM_NAVIGATION_TYPE)),
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
    changeNavigationState: (state) => dispatch(changeNavigationState(NavigationType.BOTTOM_NAVIGATION_TYPE, state)),
});

/** @namespace Component/CategoryFilterOverlay/Container */
export class CategoryFilterOverlayContainer extends PureComponent<CategoryFilterOverlayContainerProps> {
    static defaultProps: Partial<CategoryFilterOverlayContainerProps> = {
        isCategoryAnchor: true,
        isMatchingInfoFilter: false,
    };

    containerFunctions: CategoryFilterOverlayContainerFunctions = {
        onSeeResultsClick: this.onSeeResultsClick.bind(this),
        toggleCustomFilter: this.toggleCustomFilter.bind(this),
        getFilterUrl: this.getCustomFilterUrl.bind(this),
        onVisible: this.onVisible.bind(this),
        onHide: this.onHide.bind(this),
    };

    updateFilter(filterName: string, filterArray: string[]): void {
        const { location } = history;

        setQueryParams({
            customFilters: this.getFilterUrl(filterName, filterArray, false),
            page: '',
        }, location, history);
    }

    toggleCustomFilter(requestVar: string, value: string | number | boolean): void {
        this.updateFilter(requestVar, this._getNewFilterArray(requestVar, String(value)));
    }

    getFilterUrl(filterName: string, filterArray: string[], isFull = true): string {
        const { location: { pathname } } = history;
        const selectedFilters = this._getNewSelectedFiltersString(filterName, filterArray);
        const customFilters = isFull ? `${pathname}?customFilters=` : '';
        const formattedFilters = this._formatSelectedFiltersString(selectedFilters);

        return `${customFilters}${formattedFilters}`;
    }

    getCustomFilterUrl(filterKey: string, value: string): string {
        return this.getFilterUrl(filterKey, this._getNewFilterArray(filterKey, value));
    }

    _getSelectedFiltersFromUrl(): Record<string, string[]> {
        const { location } = history;
        const selectedFiltersString = (getQueryParam('customFilters', location) || '').split(';');

        return selectedFiltersString.reduce((acc, filter) => {
            if (!filter) {
                return acc;
            }
            const [key, value] = filter.split(':');

            return { ...acc, [ key ]: value.split(',') };
        }, {});
    }

    _getNewSelectedFiltersString(filterName: string, filterArray: string[]): string {
        const prevCustomFilters = this._getSelectedFiltersFromUrl();
        const customFilers = {
            ...prevCustomFilters,
            [ filterName ]: filterArray,
        };

        return Object.entries(customFilers)
            .reduce((accumulator: string[], [filterKey, filterValue]) => {
                if (filterValue.length) {
                    const filterValues = filterValue.sort().join(',');

                    accumulator.push(`${filterKey}:${filterValues}`);
                }

                return accumulator;
            }, [])
            .sort()
            .join(';');
    }

    _formatSelectedFiltersString(s: string): string {
        const hasTrailingSemicolon = s[ s.length - 1 ] === ';';
        const hasLeadingSemicolon = s[ 0 ] === ';';

        if (hasLeadingSemicolon) {
            return this._formatSelectedFiltersString(s.slice(0, -1));
        }

        if (hasTrailingSemicolon) {
            return s.slice(1);
        }

        return s;
    }

    onSeeResultsClick(): void {
        const {
            hideActiveOverlay,
            goToPreviousHeaderState,
            goToPreviousNavigationState,
        } = this.props;

        hideActiveOverlay();
        goToPreviousHeaderState();
        goToPreviousNavigationState();
    }

    onVisible(): void {
        const {
            hideActiveOverlay,
            changeHeaderState,
            changeNavigationState,
            goToPreviousNavigationState,
        } = this.props;
        const { location: { pathname, search } } = history;

        changeHeaderState({
            name: Page.FILTER,
            title: __('Filters'),
            onCloseClick: () => {
                hideActiveOverlay();
                goToPreviousNavigationState();
            },
        });

        changeNavigationState({
            name: Page.FILTER,
            isHidden: true,
        });

        window.addEventListener('popstate', this.historyBackHook);

        history.push(
            pathname + search,
            { overlayOpen: true },
        );
    }

    historyBackHook(): void {
        const {
            goToPreviousNavigationState,
            customFiltersValues,
            hideActiveOverlay,
            goToPreviousHeaderState,
        } = this.props;

        goToPreviousNavigationState();

        // close filter only if no applied filters left
        if (Object.keys(customFiltersValues).length === 0) {
            hideActiveOverlay();
            goToPreviousHeaderState();
        }
    }

    onHide(): void {
        const {
            mobileBackgroundDarkeningRef = null,
        } = this.props;

        if (mobileBackgroundDarkeningRef) {
            CSS.setVariable(mobileBackgroundDarkeningRef, 'mobile-background-darkening-display', 'none');
        }

        window.removeEventListener('popstate', this.historyBackHook);
    }

    getAreFiltersEmpty(): boolean {
        const { isInfoLoading, availableFilters } = this.props;

        return !isInfoLoading && (
            !availableFilters
            || !Object.keys(availableFilters).length
        );
    }

    containerProps(): Pick<CategoryFilterOverlayComponentProps, CategoryFilterComponentContainerPropsKey> {
        const {
            availableFilters,
            customFiltersValues,
            isCategoryAnchor,
            isInfoLoading,
            isMatchingInfoFilter,
            isProductsLoading,
            isSearchPage,
            totalPages,
        } = this.props;

        return {
            availableFilters,
            isCategoryAnchor,
            isInfoLoading,
            isProductsLoading,
            isMatchingInfoFilter,
            isSearchPage,
            totalPages,
            customFiltersValues,
            areFiltersEmpty: this.getAreFiltersEmpty(),
            isContentFiltered: this.isContentFiltered(),
        };
    }

    isContentFiltered(): boolean {
        const { customFilters, priceMin, priceMax } = this.urlStringToObject();

        return !!(customFilters || priceMin || priceMax);
    }

    urlStringToObject(): Record<string, string> {
        const { location: { search } } = history;

        return search.substr(1).split('&').reduce((acc, part) => {
            const [key, value] = part.split('=');

            return { ...acc, [ key ]: value };
        }, {});
    }

    /**
     * Returns filter array with new parameters
     *
     * @param {String} filterKey key of option
     * @param {String} value
     * @returns {Object[]}
     * @memberof CategoryShoppingOptions
     */
    _getNewFilterArray(filterKey: string, value: string): string[] {
        const { customFiltersValues, customFiltersValues: { price } } = this.props;
        const newFilterArray = customFiltersValues[
            filterKey as keyof ProductAttributeFilterOptions
        ] !== undefined
            ? Array.from(customFiltersValues[filterKey as keyof ProductAttributeFilterOptions])
            : [];

        const filterValueIndex = newFilterArray.indexOf(value);

        if (filterKey === KEY_PRICE) {
            // for price filter, choose one only
            // if price is already selected, remove
            // if price is not selected, select
            // if price is already selected and new other price is selected, replace
            return price && price.includes(value)
                ? []
                : [value];
        }

        if (filterValueIndex === -1) {
            newFilterArray.push(value);
        } else {
            newFilterArray.splice(filterValueIndex, 1);
        }

        return newFilterArray;
    }

    render(): ReactElement {
        return (
            <CategoryFilterOverlay
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilterOverlayContainer);
