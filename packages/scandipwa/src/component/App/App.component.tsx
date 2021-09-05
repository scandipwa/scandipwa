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

import { ErrorInfo, PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Provider as UnstatedProvider } from 'unstated';

import Router from 'Component/Router';
import SharedTransition from 'Component/SharedTransition';
import SomethingWentWrong from 'Component/SomethingWentWrong';
import { DeviceContextProvider } from 'Store/Device/Device.provider';
import injectStaticReducers from 'Store/index';
import getStore from 'Util/Store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppProps {}

/** @namespace /Component/App/Component/AppComponent */
export class App extends PureComponent<AppProps> {
    private reduxStore: ReturnType<typeof getStore>;

    productionFunctions = [
        this.disableReactDevTools.bind(this),
        this.injectComment.bind(this)
    ];

    developmentFunctions = [
        this.enableHotReload.bind(this)
    ];

    commonFunctions = [
        this.configureStore.bind(this)
    ];

    rootComponents = [
        this.renderRouter.bind(this),
        this.renderSharedTransition.bind(this)
    ];

    contextProviders = [
        this.renderRedux.bind(this),
        this.renderUnStated.bind(this),
        this.renderDeviceContext.bind(this)
    ];

    state = {
        isSomethingWentWrong: false,
        errorDetails: {}
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            isSomethingWentWrong: true,
            errorDetails: { err: error, info: errorInfo }
        });
    }

    __construct(props: AppProps): void {
        super.__construct!(props);

        this.configureAppBasedOnEnvironment();
        this.configureApp();
    }

    configureStore(): void {
        const store = getStore();
        injectStaticReducers(store);

        this.reduxStore = store;
    }

    renderRedux(children: JSX.Element): JSX.Element {
        return (
            <Provider store={ this.reduxStore } key="redux">
                { children }
            </Provider>
        );
    }

    renderUnStated(children: JSX.Element): JSX.Element {
        return (
            <UnstatedProvider key="unstated">
                { children }
            </UnstatedProvider>
        );
    }

    renderDeviceContext(children: JSX.Element): JSX.Element {
        return (
            <DeviceContextProvider key="device-context">
                { children }
            </DeviceContextProvider>
        );
    }

    enableHotReload(): void {
        if (module.hot) {
            module.hot.accept();
        }
    }

    injectComment(): void {
        const comment = document.createComment('Powered by ScandiPWA (scandipwa.com)');
        document.querySelector('html')?.appendChild(comment);
    }

    /**
     * Disable react-dev-tools
     * @link https://github.com/facebook/react-devtools/issues/191#issuecomment-367905536
     */
    disableReactDevTools(): void {
        if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
            // eslint-disable-next-line no-restricted-syntax, fp/no-loops, no-unused-vars
            for (const [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
                window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value === 'function' ? () => {} : null;
            }
        }
    }

    configureAppBasedOnEnvironment(): void {
        const functionsToRun = process.env.NODE_ENV === 'production'
            ? this.productionFunctions
            : this.developmentFunctions;

        functionsToRun.forEach((func) => func());
    }

    configureApp(): void {
        this.commonFunctions.forEach((func) => func());
    }

    handleErrorReset = (): void => {
        this.setState({ isSomethingWentWrong: false });
    };

    renderSharedTransition(): JSX.Element {
        return (
            <SharedTransition key="transition" />
        );
    }

    renderRouter(): JSX.Element {
        return (
            <Router key="router" />
        );
    }

    renderRootComponents = (): JSX.Element => (
        <>{ this.rootComponents.map((render) => render()) }</>
    );

    renderContextProviders(): JSX.Element {
        const { isSomethingWentWrong } = this.state;

        const child = isSomethingWentWrong
            ? this.renderSomethingWentWrong
            : this.renderRootComponents;

        return (
            <>
                { this.contextProviders.reduce(
                    (acc, render) => render(acc),
                    child()
                ) }

            </>
        );
    }

    renderSomethingWentWrong = (): JSX.Element => {
        const { errorDetails } = this.state;

        return (
            <SomethingWentWrong
              onClick={ this.handleErrorReset }
              errorDetails={ errorDetails }
            />
        );
    };

    render(): JSX.Element {
        return this.renderContextProviders();
    }
}
