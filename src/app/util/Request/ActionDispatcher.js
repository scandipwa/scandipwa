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

import { prepareMutation, Field } from 'Util/Query';
import { executePost } from 'Util/Request/Request';

/**
 * Abstract request dispatcher.
 * @class MutationDispatcher
 */
class MutationDispatcher {
    /**
     * Make GraphQL request from raw mutations
     * @param {Array<Field>|Field} rawMutations Array or single item of Field instances
     */
    executeFetch(rawMutations) {
        const queries = rawMutations instanceof Field ? [rawMutations] : rawMutations;
        return executePost(prepareMutation(queries, true));
    }
}

export default MutationDispatcher;
