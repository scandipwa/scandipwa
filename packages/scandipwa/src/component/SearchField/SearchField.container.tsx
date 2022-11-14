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

import { ChangeEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { updateSearchCriteria } from 'Store/ProductList/ProductList.action';
import { RootState } from 'Util/Store/Store.type';

import { SearchFieldComponent } from './SearchField.component';
import {
    SearchFieldContainerFunctions, SearchFieldContainerMapDispatchToProps, SearchFieldContainerMapStateToProps, SearchFieldContainerProps,
} from './SearchField.type';

/** @namespace Component/SearchField/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SearchFieldContainerMapStateToProps => ({
    device: state.ConfigReducer.device,
    navigationState: state.NavigationReducer[ NavigationType.TOP_NAVIGATION_TYPE ].navigationState,
    searchCriteria: state.ProductListReducer.searchCriteria,
    activeOverlay: state.OverlayReducer.activeOverlay,
});

/** @namespace Component/SearchField/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SearchFieldContainerMapDispatchToProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE)),
    setNavigationState: (stateName) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName)),
    updateSearchCriteria: (searchCriteria) => dispatch(updateSearchCriteria(searchCriteria)),
});

/** @namespace Component/SearchField/Container */
export class SearchFieldContainer extends PureComponent<SearchFieldContainerProps> {
    containerFunctions: SearchFieldContainerFunctions = {
        onSearchBarFocus: this.onSearchBarFocus.bind(this),
        onSearchBarChange: this.onSearchBarChange.bind(this),
        onSearchOutsideClick: this.onSearchOutsideClick.bind(this),
        onClearSearchButtonClick: this.onClearSearchButtonClick.bind(this),
    };

    componentDidUpdate(prevProps: SearchFieldContainerProps) {
        const { navigationState: { name: prevName } } = prevProps;
        const { navigationState: { name } } = this.props;

        if (prevName === Page.SEARCH && prevName !== name) {
            this.hideSearchOverlay();
        }
    }

    onSearchBarFocus(): void {
        const {
            setNavigationState,
            goToPreviousNavigationState,
            showOverlay,
            navigationState: { name },
            device,
        } = this.props;

        if (
            (!device.isMobile && name === Page.SEARCH)
            || (device.isMobile && name !== Page.MENU)
        ) {
            return;
        }

        showOverlay(Page.SEARCH);

        setNavigationState({
            name: Page.SEARCH,
            onBackClick: () => {
                showOverlay(Page.MENU);
                goToPreviousNavigationState();
            },
        });
    }

    onSearchBarChange(
        { target: { value: searchCriteria } }: ChangeEvent<HTMLInputElement> | { target: { value: string } },
    ): void {
        const { updateSearchCriteria } = this.props;

        updateSearchCriteria(searchCriteria);
    }

    onSearchOutsideClick(): void {
        const {
            goToPreviousNavigationState,
            navigationState: { name },
        } = this.props;

        if (name === Page.SEARCH) {
            this.hideSearchOverlay();
            goToPreviousNavigationState();
        }
    }

    hideSearchOverlay(): void {
        const { hideActiveOverlay, activeOverlay } = this.props;

        updateSearchCriteria('');

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        if (activeOverlay === Page.SEARCH) {
            hideActiveOverlay();
        }
    }

    onClearSearchButtonClick(): void {
        const { updateSearchCriteria } = this.props;

        updateSearchCriteria('');
    }

    containerProps() {
        const {
            searchCriteria,
            isVisible,
            navigationState,
        } = this.props;

        return {
            searchCriteria,
            isVisible,
            navigationState,
        };
    }

    render() {
        return (
            <SearchFieldComponent
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFieldContainer);
