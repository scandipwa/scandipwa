import { RequestOptions } from '.';
import { GraphQLDocument } from './prepare-document';

const envAgnosticFetch: typeof window.fetch = typeof window === 'undefined'
    ? require('node-fetch')
    : window.fetch;

export const processHeaders = (headers: any, options: RequestOptions): any => {
    const { headers: additionalHeaders = {} } = options;

    return {
        ...headers,
        ...additionalHeaders
    };
};

export const postFetch = (
    query: string,
    variables: GraphQLDocument['variables'],
    options: RequestOptions
): Promise<Response> => envAgnosticFetch(
    options.endpoint,
    {
        ...options,
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: processHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }, options)
    }
);

export const executePost = (
    queryObject: GraphQLDocument,
    options: RequestOptions
) => {
    const { query, variables } = queryObject;

    return postFetch(query, variables, options);
};
