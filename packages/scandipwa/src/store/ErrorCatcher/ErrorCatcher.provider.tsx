import { ErrorInfo, PureComponent } from 'react';

import { ErrorCatcherContext } from './ErrorCatcher.context';

export class ErrorCatcherContextProvider extends PureComponent {
    state = {
        hasError: false,
        error: undefined,
        errorInfo: undefined
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    }

    setHasError(hasError: boolean): void {
        this.setState({
            hasError
        });
    }

    render(): JSX.Element {
        const { children } = this.props;
        const { hasError, error, errorInfo } = this.state;
        const contextValue = {
            hasError,
            error,
            errorInfo,
            setHasError: this.setHasError.bind(this)
        };

        return (
            <ErrorCatcherContext.Provider value={ contextValue }>
                { children }
            </ErrorCatcherContext.Provider>
        );
    }
}
