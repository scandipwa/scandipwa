import CloseIcon from 'Component/CloseIcon';
import SearchIcon from 'Component/SearchIcon';

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
    const { searchCriteria } = instance.props;

    if (searchCriteria) {
        return (
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
        );
    }

    return (
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
    );
};

export default {
    'Component/SearchField/Component': {
        'member-function': {
            componentDidMount,
            renderSearchIcon
        }
    }
};
