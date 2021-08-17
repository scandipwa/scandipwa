import { isCrawler, isSSR } from 'Util/Browser';

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
import './CategoryPage.style.plugin.scss';

export const renderMiscellaneous = (args, callback, instance) => {
    const { category: { name } = {}, device: { isMobile } } = instance.props;

    if (!instance.displayProducts()) {
        return null;
    }

    if (isMobile) {
        return (
            <aside block="CategoryPage" elem="TopPanel">
                <h1 block="CategoryPage" elem="Title">{ name }</h1>
                { instance.renderItemsCount() }
                <div block="CategoryPage" elem="Filters">
                    <div
                      block="CategoryPage"
                      elem="LayoutWrapper"
                      mods={ { isPrerendered: isSSR() || isCrawler() } }
                    >
                        { instance.renderLayoutButtons() }
                        { instance.renderCategorySort() }
                    </div>
                    { instance.renderFilterButton() }
                </div>
            </aside>
        );
    }

    return callback();
};

export default {
    'Route/CategoryPage/Component': {
        'member-function': {
            renderMiscellaneous
        }
    }
};
