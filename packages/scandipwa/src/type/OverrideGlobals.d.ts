import { StoreEnhancer } from 'redux';

declare global {
    interface Window {
        '__REACT_DEVTOOLS_GLOBAL_HOOK__'?: Record<string, unknown>
        '__REDUX_DEVTOOLS_EXTENSION__'?: (options: unknown) => StoreEnhancer<unknown, unknown>
        storeRegexText: string
        actionName?: {
            type?: string
        }
    }

    function __(message: string): string

    namespace React {

        interface Component {
            __construct?(props: unknown): void
        }

        interface ClassAttributes<T> {
            block?: string
            elem?: string
            mods?: Record<string, unknown>
        }
    }

}
