import { useErrorCatcherContext } from 'Store/ErrorCatcher/ErrorCatcher.context';
import { ErrorCatcherContextProvider } from 'Store/ErrorCatcher/ErrorCatcher.provider';
import { renderHOC } from 'Util/RenderHOC';

import { AppComponent, AppProps } from './App.component';

export const appLogic = (): AppProps => {
    const { hasError, setHasError, errorInfo } = useErrorCatcherContext();

    return {
        hasError,
        setHasError,
        errorInfo
    };
};

export const AppContainer = renderHOC(AppComponent, appLogic, 'AppContainer');

export const App = (): JSX.Element => (
    <ErrorCatcherContextProvider>
        <AppContainer />
    </ErrorCatcherContextProvider>
);
