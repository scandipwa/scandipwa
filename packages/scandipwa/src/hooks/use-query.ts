import {
    client,
    DataType,
    Mutation,
    Query
} from '@tilework/opus';
import { useEffect, useState } from 'react';

// client.setEndpoint('https://api.spacex.land/graphql/');

export function useQuery<
  T extends Query<string, unknown, boolean> | Mutation<string, unknown, boolean>
>(query: T): {
    result: DataType<typeof query> | undefined;
    isLoading: boolean;
    error?: Error;
  } {
    const [result, setResult] = useState<{
    result: DataType<typeof query> | undefined;
    isLoading: boolean;
    error?: Error;
  }>({
      result: undefined,
      isLoading: false,
      error: undefined
  });

    useEffect(() => {
        if (result.result) {
            return;
        }

        let mounted = true;
        setResult({
            ...result,
            isLoading: true
        });

        client
            .post(query)
            .then((res) => {
                if (mounted) {
                    setResult({
                        result: res as DataType<typeof query>,
                        error: undefined,
                        isLoading: false
                    });
                }
            })
            .catch((e) => {
                if (mounted) {
                    setResult({
                        result: undefined,
                        error: e,
                        isLoading: false
                    });
                }
            });

        return () => {
            mounted = false;
        };
    }, [query]);

    return result;
}
