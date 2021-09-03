interface Window {
    '__REACT_DEVTOOLS_GLOBAL_HOOK__'?: Record<string, unknown>;
    storeRegexText: string
}

declare function __(message: string): string

declare namespace React {

    interface Component {
        __construct?(props: unknown): void
    }
}
