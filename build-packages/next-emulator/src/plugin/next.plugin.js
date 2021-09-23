/* eslint-disable */
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

import AppWrapper from '../component/AppWrapper';
import { getQuery, isMatchingRoute } from '../util/Next';

const { NEXTJS_PAGES } = process.env;
const nextPages = JSON.parse(NEXTJS_PAGES);
const nextRoutes = Object.keys(nextPages);

const render = (args, callback) => {
    const { pathname } = location;
    const matchingRoute = nextRoutes.find((route) => isMatchingRoute(route, pathname));

    if (matchingRoute) {
        return (
            <AppWrapper route={ matchingRoute } query={ getQuery(matchingRoute, pathname) } />
        );
    }

    return callback(...args);
};

export default {
    'Component/App/Component': {
        'member-function': {
            render
        }
    }
};
