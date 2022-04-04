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

import { QueryObject, QueryVariables } from 'Util/Request';
import { Field } from './Field';
import { FieldArgument, FieldType, PreparedRequest } from './Query.type';

/**
 * Prepare request body string from query list (all entries must be instances of Query).
 * @param  {Array<Field>} queries
 * @return {String} JSON String, format: `{"query":"{alias: queryName (attr:key) { field1, field2 }}"}`
 * @namespace Util/Query/PrepareDocument/prepareFieldString */
export const prepareFieldString = (
    rootField: Field,
    accArgs: Record<string, [string, unknown]> = {}
): string => {
    const {
        alias, name, args, children
    } = rootField;

    const resolvedArgs = args.reduce((acc, arg): string[] => {
        if (!accArgs[arg.name]) {
            // eslint-disable-next-line no-param-reassign
            accArgs[arg.name] = [] as unknown as [string, unknown];
        }

        // add type and value of the argument into argument accumulator,
        // we will need this value when building the query doc and variables
        const index = accArgs[arg.name].push([arg.type, arg.value]);

        // join each argument as "name:$var_1"
        return [...acc, `${arg.name}:$${arg.name}_${index}`];
    }, [] as string[]);

    // join arguments, wrap into "()" and join with ","
    const formattedArgs = resolvedArgs.length ? `(${resolvedArgs.join(',')})` : '';

    // join child fields with ","
    const formattedChildren = children.map((field) => prepareFieldString(field, accArgs)).join(',');

    // wrap body with "{}"
    const body = children.length ? `{${formattedChildren}}` : '';

    // format like "alias:name(arg: $var){field1,field2}"
    return `${alias}${name}${formattedArgs}${body}`;
};

/** @namespace Util/Query/PrepareDocument/prepareRequest */
export const prepareRequest = <T>(fields: Field[], type: FieldType): QueryObject => {
    const fieldsArray = Array.isArray(fields) ? fields : [fields];

    if (type !== FieldType.MUTATION && type !== FieldType.QUERY) {
        // we only support Mutation and Query types
        throw new Error(`GraphQL document type "${type}" is not supported.`);
    }

    const variables: QueryVariables = {};
    const accArgs = {};

    // prepare fields from each field passed
    const fieldStrings = fieldsArray.map((field) => prepareFieldString(field, accArgs)).join(',');

    // go through argument accumulator collected in "prepareFieldString", join values
    // into the format "$var:Type" and append variable value to variables field
    const resolvedArgs = Object.entries(accArgs).reduce((acc, [name, dataArray]): string[] => {
        (dataArray as Array<Omit<FieldArgument, 'name'>>).forEach((item, i: number) => {
            const variable: string = `${name}_${i + 1}`;
            acc.push(`$${variable}:${item.type}`);
            variables[variable] = item.value as any;
        });

        return acc;
    }, [] as string[]);

    // Wrap arguments with "()" and join using ","
    const formattedArgs = resolvedArgs.length ? `(${resolvedArgs.join(',')})` : '';

    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
            '%cGraphQL Request',
            'background-color: #ff00ff; color: #ffffff; font-weight: bold; border-radius: 5px; padding: 2px 5px',
            {
                query: `${type}${formattedArgs}{${fieldStrings}}`,
                variables
            }
        );
    }

    return {
        // format like "query($var_1:String){test(arg: $var_1){id}}"
        query: `${type}${formattedArgs}{${fieldStrings}}`,
        variables
    };
};

/** @namespace Util/Query/PrepareDocument/prepareMutation */
export const prepareMutation = (mutations: Field[]): QueryObject => prepareRequest(mutations, FieldType.MUTATION);

/** @namespace Util/Query/PrepareDocument/prepareQuery */
export const prepareQuery = (queries: Field[]): QueryObject => prepareRequest(queries, FieldType.QUERY);
