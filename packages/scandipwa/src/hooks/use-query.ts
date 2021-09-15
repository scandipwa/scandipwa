import {
    client,
    DataType,
    Mutation,
    Query
} from '@tilework/opus';
import {
    useCallback, useEffect, useMemo, useState
} from 'react';

// client.setEndpoint('https://api.spacex.land/graphql/');

export interface UseQueryResult<T extends Query<string, unknown, boolean> | Mutation<string, unknown, boolean>> {
    data: DataType<T> | undefined;
    isLoading: boolean;
    error?: Error;
    request: () => Promise<boolean>
}

export interface UseQueryOptions {
    executeOnMount?: boolean
}

export function useQuery<
  T extends Query<string, unknown, boolean> | Mutation<string, unknown, boolean>
>(query: T, options: UseQueryOptions = {}): UseQueryResult<T> {
    const [result, setResult] = useState<Omit<UseQueryResult<T>, 'request'>>({
        data: undefined,
        isLoading: false,
        error: undefined
    });

    const controller = useMemo(() => new AbortController(), []);

    const request = useCallback(async () => {
        try {
            const data = await client.post(query, { signal: controller.signal });

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
