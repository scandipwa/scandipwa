import { createContext, ErrorInfo, useContext } from 'react';

export interface ErrorCatcherContextType {
    hasError: boolean;
    error?: Error
    errorInfo?: ErrorInfo
    setHasError: (hasError: boolean) => void
}

export const ErrorCatcherContext = createContext<ErrorCatcherContextType>({
    hasError: false,
    error: undefined,
    errorInfo: undefined,
    setHasError: () => {}
});

export const useErrorCatcherContext = (): ErrorCatcherContextType => useContext(ErrorCatcherContext);
