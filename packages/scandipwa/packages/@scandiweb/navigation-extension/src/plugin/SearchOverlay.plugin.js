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

import Overlay from 'Component/Overlay/Overlay.container';
import { SEARCH_TIMEOUT } from 'Component/SearchOverlay/SearchOverlay.config';

export const render = (args, callback, instance) => {
    const { isHideOverlay, searchCriteria, device: { isMobile } } = instance.props;

    if (!searchCriteria.trim() && !isMobile) {
        return null;
    }

    if (isHideOverlay) {
        return (
            <article
              block="SearchOverlay"
              elem="Results"
              aria-label="Search results"
            >
                { instance.renderSearchResults() }
            </article>
        );
    }

    return (
        <Overlay
          id="search"
          mix={ { block: 'SearchOverlay' } }
        >
            <article
              block="SearchOverlay"
              elem="Results"
              aria-label="Search results"
            >
                { instance.renderSearchResults() }
            </article>
        </Overlay>
    );
};

export const componentDidUpdate = (args, callback, instance) => {
    const [prevProps] = args;

    const { searchCriteria: prevSearchCriteria } = prevProps;
    const { searchCriteria, clearSearchResults, makeSearchRequest } = instance.props;

    if (searchCriteria && searchCriteria !== prevSearchCriteria) {
        if (instance.timeout) {
            clearTimeout(instance.timeout);
        }

        clearSearchResults();
        instance.timeout = setTimeout(() => {
            instance.timeout = null;
            makeSearchRequest();
        }, SEARCH_TIMEOUT);
    }
};

export default {
    'Component/SearchOverlay/Component': {
        'member-function': {
            render,
            componentDidUpdate
        }
    }
};
