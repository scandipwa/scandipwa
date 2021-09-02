interface Window {
    '__REACT_DEVTOOLS_GLOBAL_HOOK__'?: Record<string, unknown>;
}

declare namespace React {

    interface Component {
        __construct(props: unknown): void
    }
}
