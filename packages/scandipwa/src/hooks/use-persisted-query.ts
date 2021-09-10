import {
    client,
    DataType,
    Mutation,
    Query
} from '@tilework/opus';
import {
    useCallback, useEffect, useMemo, useState
} from 'react';

import { prepareQuery } from 'Util/Query';
import { hash } from 'Util/Request/Hash';

window.dataCache = {};

// client.setEndpoint('https://api.spacex.land/graphql/');

export interface UsePersistedQueryResult<
    T extends Query<string, unknown, boolean> | Mutation<string, unknown, boolean>
> {
    data: DataType<T> | undefined;
    isLoading: boolean;
    error?: Error;
    request: () => Promise<boolean>
}

export interface UsePersistedQueryOptions {
    executeOnMount?: boolean
}

export function usePersistedQuery<
  T extends Query<string, unknown, boolean> | Mutation<string, unknown, boolean>
>(query: T, options: UsePersistedQueryOptions = {}): UsePersistedQueryResult<T> {
    const [result, setResult] = useState<Omit<UsePersistedQueryResult<T>, 'request'>>({
        data: undefined,
        isLoading: false,
        error: undefined
    });
    const controller = useMemo(() => new AbortController(), []);
    const preparedQuery = useMemo(() => prepareQuery(query), []);
    const queryHash = useMemo(
        () => hash(preparedQuery.query + JSON.stringify(preparedQuery.variables)),
        [preparedQuery.query, preparedQuery.variables]
    );
    const request = useCallback(async () => {
        if (window.dataCache?.[queryHash]) {
            setResult({
                data: window.dataCache?.[queryHash] as DataType<T>,
                error: undefined,
                isLoading: false
            });
        }
        try {
            const data = await client.post(query); // , { signal: controller.signal });

            setResult({
                data: data as DataType<T>,
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
            }

            return false;
        }
    }, [query]);

    useEffect(() => {
        if (options.executeOnMount) {
            request();
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
