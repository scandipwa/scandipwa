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

import { Field, prepareQuery } from 'Util/Query';
import { executePost } from 'Util/Request/Request';

/** @namespace Util/Request/Query/fetchQuery */
// eslint-disable-next-line import/prefer-default-export
export const fetchQuery = (rawQueries) => {
    const queries = rawQueries instanceof Field ? [rawQueries] : rawQueries;

    return executePost(prepareQuery(queries, true));
};
