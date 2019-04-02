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

import Field from 'Util/Query/Field';

const prepareHelper = (queries) => {
    const querySelections = [];
    const variableDefinitions = [];
    let variableAssignments = {};
    let queryType = '';
    queries.forEach((querySelection) => {
        if (!(querySelection instanceof Field)) {
            console.warn('Query can only be prepared from other queries!',
                querySelection,
                'is not instance of Util/Query!');
            return null;
        }

        const query = querySelection.build();
        querySelections.push(query.toString());
        if (query.variableDefinitions) variableDefinitions.push(query.variableDefinitions);

        variableAssignments = Object.assign(variableAssignments, query.variableValues);
        queryType = query._componentType;
    });

    return {
        querySelections,
        variableDefinitions,
        variableAssignments,
        queryType,
        areArgumentsPresent: variableDefinitions.length > 0
    };
};

export { prepareHelper };
