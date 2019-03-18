/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import Field from 'Util/Query/Field';

/**
 * Prepare request body string from query list (all entries must be instances of Query).
 * @param  {Array<Field>} queries
 * @return {String} JSON String, format: `{"query":"{alias: queryName (attr:key) { field1, field2 }}"}`
 */
const prepareQuery = (queries) => {
    const querySelections = [];
    const variableDefinitions = [];
    let variableAssignments = {};
    queries.forEach((querySelection) => {
        if (!(querySelection instanceof Field)) {
            console.warn('Query can only be prepared from other queries!',
                querySelection,
                'is not instance of Util/Query!');
            return null;
        }

        const query = querySelection.build();
        querySelections.push(query.toString());
        variableDefinitions.push(query.variableDefinitions);
        variableAssignments = Object.assign(variableAssignments, query.variableValues);
    });

    return {
        query: `query (${ variableDefinitions.join(', ') }) {${ querySelections.join(', ') }}`,
        variables: variableAssignments
    };
};

export { prepareQuery };
