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

import {
    client,
    Mutation,
    Query
} from '@tilework/opus';
import {
    useCallback, useEffect, useMemo, useState
} from 'react';

// client.setEndpoint('https://api.spacex.land/graphql/');

export interface UseQueryResult<T> {
    data: T | undefined;
    isLoading: boolean;
    error?: Error;
    request: <
        Name extends string,
        FieldReturnType,
        IsArray extends boolean
    >(query: Query<Name, FieldReturnType, IsArray> | Mutation<Name, FieldReturnType, IsArray>) => Promise<boolean>
}

export interface UseQueryOptions {
    requestOnMount?: boolean
    query: Query<string, unknown, boolean> | Mutation<string, unknown, boolean>
}

export function useQuery<T>(options: UseQueryOptions): UseQueryResult<T> {
    const [result, setResult] = useState<Omit<UseQueryResult<T>, 'request'>>({
        data: undefined,
        isLoading: false,
        error: undefined
    });

    const controller = useMemo(() => new AbortController(), []);

    const request = useCallback(async <
        Name extends string,
        FieldReturnType,
        IsArray extends boolean
    >(
        query: Query<Name, FieldReturnType, IsArray> | Mutation<Name, FieldReturnType, IsArray>
    ) => {
        try {
            const data = await client.post(query, { signal: controller.signal });

            setResult({
                data: data as unknown as T,
                error: undefined,
                isLoading: false
            });

            return true;
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return false;
                }
                setResult({
                    data: undefined,
                    error,
                    isLoading: false
                });
            } else {
                throw error;
            }

            return false;
        }
    }, []);

    useEffect(() => {
        if (options && options.requestOnMount) {
            request(options.query);
        }
    }, []);

    useEffect(() => () => {
        if (result.isLoading) {
            controller.abort();
        }
    }, [result.isLoading]);

    return {
        data: result.data,
        isLoading: result.isLoading,
        request,
        error: result.error
    };
}
