import { AbstractField, Argument } from '../builder/AbstractField';

export enum GraphQlRequestType {
    Mutation = 'mutation',
    Query = 'query'
}
interface AccArgs {
    [name: string]: Array<[string, string]>
}

export interface GraphQLDocument {
    query: string,
    variables: {[name: string]: string}
}

export const prepareFieldString = (
    rootField: AbstractField<any, any, any>,
    accArgs: AccArgs = {}
): string => {
    const {
        alias, name, args, children
    } = rootField;

    const resolvedArgs = args.reduce((acc: Array<string>, arg: Argument) => {
        const { name, type, value } = arg;

        if (!accArgs[name]) {
            accArgs[name] = [];
        }

        // add type and value of the argument into argument accumulator,
        // we will need this value when building the query doc and variables
        const index = accArgs[name].push([type, value]);

        // join each argument as "name:$var_1"
        return [...acc, `${name}:$${name}_${index}`];
    }, []);

    // join arguments, wrap into "()" and join with ","
    const formattedArgs = resolvedArgs.length ? `(${resolvedArgs.join(',')})` : '';

    // join child fields with ","
    const formattedChildren = children.map((field) => prepareFieldString(field, accArgs)).join(',');

    // wrap body with "{}"
    const body = children.length ? `{${formattedChildren}}` : '';

    // format like "alias:name(arg: $var){field1,field2}"
    return `${alias}${name}${formattedArgs}${body}`;
};

export const prepareRequest = (
    fields: AbstractField<any, any, any> | AbstractField<any, any, any>[],
    type: GraphQlRequestType
): GraphQLDocument => {
    const fieldsArray = Array.isArray(fields) ? fields : [fields];

    const variables: {[name: string]: string} = {};
    const accArgs: AccArgs = {};

    // prepare fields from each field passed
    const fieldStrings = fieldsArray.map((field) => prepareFieldString(field, accArgs)).join(',');

    // go through argument accumulator collected in "prepareFieldString", join values
    // into the format "$var:Type" and append variable value to variables field
    const resolvedArgs = Object.entries(accArgs).reduce((acc: Array<string>, [name, dataArray]) => {
        dataArray.forEach(([type, value], i) => {
            const variable = `${name}_${i + 1}`;
            acc.push(`$${variable}:${type}`);
            variables[variable] = value;
        });

        return acc;
    }, []);

    // Wrap arguments with "()" and join using ","
    const formattedArgs = resolvedArgs.length ? `(${resolvedArgs.join(',')})` : '';

    return {
        // format like "query($var_1:String){test(arg: $var_1){id}}"
        query: `${type}${formattedArgs}{${fieldStrings}}`,
        variables
    };
};
