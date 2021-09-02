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
// import { Provider } from 'react-redux';
import { Provider as UnstatedProvider } from 'unstated';

import Router from 'Component/Router';
import SharedTransition from 'Component/SharedTransition';
import SomethingWentWrong from 'Route/SomethingWentWrong';
// import injectStaticReducers from 'Store/index';
// import getStore from 'Util/Store';

export interface AppProps {}

declare module 'react' {
    interface Component {
        __construct(props: unknown): void
    }
}

/** @namespace /Component/App/Component/AppComponent */
export class App extends PureComponent<AppProps> {
    productionFunctions = [
        this.disableReactDevTools.bind(this),
        this.injectComment.bind(this)
    ];

    developmentFunctions = [
        this.enableHotReload.bind(this)
    ];

    commonFunctions = [
        // this.configureStore.bind(this)
    ];

    rootComponents = [
        this.renderRouter.bind(this),
        this.renderSharedTransition.bind(this)
    ];

    contextProviders = [
        // this.renderRedux.bind(this),
        this.renderUnStated.bind(this)
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
        super.__construct(props);

        this.configureAppBasedOnEnvironment();
        this.configureApp();
    }

    // configureStore() {
    //     const store = getStore();
    //     injectStaticReducers(store);

    //     this.reduxStore = store;
    // }

    // renderRedux(children) {
    //     return (
    //         <Provider store={ this.reduxStore } key="redux">
    //             { children }
    //         </Provider>
    //     );
    // }

    renderUnStated(children: React.ReactChildren): JSX.Element {
        return (
            <UnstatedProvider key="unstated">
                { children }
            </UnstatedProvider>
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

    configureAppBasedOnEnvironment() {
        const functionsToRun = process.env.NODE_ENV === 'production'
            ? this.productionFunctions
            : this.developmentFunctions;

        functionsToRun.forEach((func) => func());
    }

    configureApp() {
        this.commonFunctions.forEach((func) => func());
    }

    handleErrorReset = () => {
        this.setState({ isSomethingWentWrong: false });
    };

    renderSharedTransition() {
        return (
            <SharedTransition key="transition" />
        );
    }

    renderRouter() {
        return (
            <Router key="router" />
        );
    }

    renderRootComponents = () => this.rootComponents.map((render) => render());

    renderContextProviders() {
        const { isSomethingWentWrong } = this.state;

        const child = isSomethingWentWrong
            ? this.renderSomethingWentWrong
            : this.renderRootComponents;

        return this.contextProviders.reduce(
            (acc, render) => render(acc),
            [child()]
        );
    }

    renderSomethingWentWrong = () => {
        const { errorDetails } = this.state;

        return (
            <SomethingWentWrong
              onClick={ this.handleErrorReset }
              errorDetails={ errorDetails }
            />
        );
    };

    render() {
        return this.renderContextProviders();
    }
}
