/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

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
