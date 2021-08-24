/* eslint-disable no-mixed-operators */
import CloseIcon from 'Component/CloseIcon';
import SearchIcon from 'Component/SearchIcon';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

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

export const componentDidMount = (args, callback, instance) => {
    const { device: { isMobile } } = instance.props;

    if (isMobile) {
        instance.searchBarRef.current.focus();
    }
};

export const renderSearchIcon = (args, callback, instance) => {
    const { searchCriteria, device: { isMobile } } = instance.props;

    return (
        <>
            { (isMobile || (!isMobile && !searchCriteria)) && (
                <div
                  block="SearchField"
                  elem="SearchIcon"
                  role="button"
                  tabIndex="0"
                  onClick={ instance.openSearch }
                  onKeyDown={ instance.openSearch }
                  aria-label={ __('Search') }
                >
                    <SearchIcon />
                </div>
            ) }
            { searchCriteria && (
                <div
                  block="SearchField"
                  elem="CloseIcon"
                  role="button"
                  tabIndex="0"
                  onClick={ instance.closeSearch }
                  onKeyDown={ instance.closeSearch }
                  aria-label={ __('Close') }
                >
                    <CloseIcon />
                </div>
            ) }
        </>
    );
};

export const onSearchEnterPress = (args, callback, instance) => {
    const [e] = args;
    const {
        searchCriteria,
        hideActiveOverlay,
        onSearchBarChange,
        deactivateSearchBar
    } = instance.props;

    const search = searchCriteria.trim().replace(/\s/g, '+');
    const trimmedSearch = searchCriteria.trim();

    if (e.key === 'Enter' && trimmedSearch !== '') {
        history.push(appendWithStoreCode(`/search/${ search }`));
        hideActiveOverlay();
        onSearchBarChange({ target: { value: '' } });
        instance.searchBarRef.current.blur();
        instance.closeSearch();
        deactivateSearchBar();
    }
};

export default {
    'Component/SearchField/Component': {
        'member-function': {
            componentDidMount,
            renderSearchIcon,
            onSearchEnterPress
        }
    }
};
