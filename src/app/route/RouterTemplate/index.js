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

import { connect } from 'react-redux';

import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';

import {
    AppRouter as BaseRouter,
    BEFORE_ITEMS_TYPE,
    SWITCH_ITEMS_TYPE,
    AFTER_ITEMS_TYPE
} from 'SourceRoute';

class AppRouter extends BaseRouter {
    constructor() {
        super();
        this.customItems = {
            beforeItems: [
            ],
            switchItems: [
                // An example route below will we applied after 2 element in the parents switch
                // {
                //     component: <Route path="/myroute" exact component={ MyComponent } />,
                //     position: 23
                // }
            ],
            afterItems: [
            ]
        };

        const {
            beforeItems,
            switchItems,
            afterItems
        } = this.customItems;

        this.itemsMap = {
            [BEFORE_ITEMS_TYPE]: beforeItems,
            [SWITCH_ITEMS_TYPE]: switchItems,
            [AFTER_ITEMS_TYPE]: afterItems
        };
    }

    getItemsByContentType(contentType) {
        return this.itemsMap[contentType];
    }

    prepareContent(items, contentType) {
        const customItems = this.getItemsByContentType(contentType);

        if (!customItems) throw Error('Please provide at least one content block');

        const mergedItems = items.concat(customItems);
        const arraySize = customItems.length + items.length;
        const data = new Array(arraySize).fill(null);

        mergedItems.forEach((item) => {
            if (item.position < 0) {
                return console.warn(
                    `Router item has negative position ${
                        item.position
                    }! Use positive values only.`
                );
            }
            if (data[item.position]) {
                throw Error(`Router item has occupied position ${
                    item.position
                }! Choose another position.`);
            }
            data[item.position] = item;
            return true;
        });

        return data;
    }
}

const mapDispatchToProps = dispatch => ({
    updateHeaderAndFooter: (options) => {
        HeaderAndFooterDispatcher.handleData(dispatch, options);
    }
});

const AppRouterContainer = connect(() => ({}), mapDispatchToProps)(AppRouter);

export default AppRouterContainer;
