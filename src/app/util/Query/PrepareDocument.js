/* eslint-disable no-console */

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

export const MUTATION_TYPE = 'mutation';
export const QUERY_TYPE = 'query';

/**
 * Prepare request body string from query list (all entries must be instances of Query).
 * @param  {Array<Field>} queries
 * @return {String} JSON String, format: `{"query":"{alias: queryName (attr:key) { field1, field2 }}"}`
 * @namespace Util/Query/prepareDocument
 */
export const prepareDocument = (queries) => {
    const args = [];
    const querySelections = [];
    const variableDefinitions = [];
    const variableAssignments = queries.reduce((variableAssignmentMap, querySelection) => {
        if (!(querySelection instanceof Field)) {
            console.warn('Query can only be prepared from other queries!');
            return {};
        }

        querySelection.build(args);
        querySelections.push(querySelection.toString());
        variableDefinitions.push(...querySelection.variableDefinitions);

        return {
            ...variableAssignmentMap,
            ...querySelection.variableValues
        };
    }, {});

    return {
        variableDefinitions,
        querySelections,
        variableAssignments
    };
};

/** @namespace Util/Query/prepareRequest */
export const prepareRequest = (document, type) => {
    if (type !== MUTATION_TYPE && type !== QUERY_TYPE) {
        console.warn('Request can only prepared from Query or Mutation.');
        return null;
    }

    const {
        variableDefinitions,
        querySelections,
        variableAssignments
    } = prepareDocument(document);

    if (!querySelections || !variableAssignments) {
        return null;
    }

    const variables = variableDefinitions.length ? `(${ variableDefinitions.join(', ') })` : '';

    return {
        query: `${type} ${variables} {${ querySelections.join(', ') }}`,
        variables: variableAssignments
    };
};

/** @namespace Util/Query/prepareMutation */
export const prepareMutation = (mutations) => prepareRequest(mutations, MUTATION_TYPE);

/** @namespace Util/Query/prepareQuery */
export const prepareQuery = (queries) => prepareRequest(queries, QUERY_TYPE);
