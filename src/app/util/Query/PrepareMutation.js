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

import { prepareHelper } from 'Util/Query/PrepareHelper';

/**
 * Prepare request body string from query list (all entries must be instances of Query).
 * @param  {Array<Field>} queries
 * @return {String} JSON String, format: `{"query":"{alias: queryName (attr:key) { field1, field2 }}"}`
 */
const prepareMutation = (queries) => {
    const queryValues = prepareHelper(queries);
    const {
        variableDefinitions,
        variableAssignments,
        queryType,
        querySelections,
        areArgumentsPresent
    } = queryValues;
    let query;

    if (areArgumentsPresent) {
        query = `mutation(${ variableDefinitions.join(', ') }) {${ querySelections.join(', ') }}`;
    } else {
        query = `mutation {${ querySelections.join(', ') }}`;
    }

    return {
        query,
        variables: variableAssignments,
        areArgumentsPresent,
        queryType
    };
};

export { prepareMutation };
