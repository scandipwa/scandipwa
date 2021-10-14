import { AbstractField, GraphQlRequestType, prepareRequest } from '@tilework/opus';
import {
    useCallback, useEffect, useMemo, useState
} from 'react';

import { executeGet } from 'Util/Request';
import { hash } from 'Util/Request/Hash';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { CACHE_TABLE, persistedQueryStorage } from 'Util/Storage/PersistedQueryStorage';

// window.dataCache = {};

export interface UsePersistedQueryResult<T> {
    data: T | undefined;
    isLoading: boolean;
    error?: Error;
    request: <
        Name extends string,
        FieldReturnType,
        IsArray extends boolean
    >(query: AbstractField<Name, FieldReturnType, IsArray>) => Promise<boolean>
}

export interface UsePersistedQueryOptions {
    requestOnMount: boolean
    query: AbstractField<string, unknown, boolean>
}

/** @namespace Hooks/UsePersistedQuery/usePersistedQuery */
export function usePersistedQuery<T>(options?: UsePersistedQueryOptions): UsePersistedQueryResult<T> {
    const [result, setResult] = useState<Omit<
        UsePersistedQueryResult<T>,
        'request'
        >
    >({
        data: undefined,
        isLoading: false,
        error: undefined
    });
    const controller = useMemo(() => new AbortController(), []);

    const request = useCallback(async <
        Name extends string,
        FieldReturnType,
        IsArray extends boolean
    >(query: AbstractField<Name, FieldReturnType, IsArray>) => {
        const preparedQuery = prepareRequest(query, GraphQlRequestType.Query);
        const queryHash = hash(preparedQuery.query + JSON.stringify(preparedQuery.variables));

        const cachedResult = await persistedQueryStorage.getItem<T>(`${queryHash}`, CACHE_TABLE);
        if (cachedResult) {
            setResult({
                data: cachedResult,
                error: undefined,
                isLoading: false
            });

            return true;
        }
        try {
            // refactor this
            const data = await executeGet(preparedQuery, 'DataContainer', ONE_MONTH_IN_SECONDS);

            await persistedQueryStorage.setItem(`${queryHash}`, data, ONE_MONTH_IN_SECONDS, CACHE_TABLE);

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
