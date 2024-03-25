/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import { Provider as UnstatedProvider } from 'unstated-typescript';

import Router from 'Component/Router';
import SomethingWentWrong from 'Route/SomethingWentWrong';
import { getStaticReducers } from 'Store/index';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import getStore, { injectReducers } from 'Util/Store';

import { AppComponentState } from './App.type';

/** @namespace Component/App/Component */
export class AppComponent extends PureComponent<unknown, AppComponentState> {
    protected reduxStore?: Store<unknown, AnyAction> = undefined;

    productionFunctions = [
        this.disableReactDevTools.bind(this),
        this.injectComment.bind(this),
    ];

    developmentFunctions = [
        this.enableHotReload.bind(this),
    ];

    commonFunctions = [
        this.configureStore.bind(this),
    ];

    rootComponents = [
        this.renderRouter.bind(this),
    ];

    contextProviders = [
        this.renderRedux.bind(this),
        this.renderUnStated.bind(this),
    ];

    state: AppComponentState = {
        isSomethingWentWrong: false,
        errorDetails: undefined,
    };

    __construct(props: unknown): void {
        super.__construct?.(props);

        this.configureAppBasedOnEnvironment();
        this.configureApp();
    }

    componentDidCatch(err: Error, info: unknown): void {
        this.setState({
            isSomethingWentWrong: true,
            errorDetails: { err, info },
        });
    }

    configureStore(): void {
        const store = getStore();

        injectReducers(store, getStaticReducers());

        this.reduxStore = store;
    }

    renderRedux(children: ReactElement): ReactElement {
        if (!this.reduxStore) {
            return null;
        }

        return (
            <Provider store={ this.reduxStore } key="redux">
                { children }
            </Provider>
        );
    }

    renderUnStated(children: ReactElement): ReactElement {
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
                window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value === 'function' ? noopFn : null;
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

    handleErrorReset(): void {
        this.setState({ isSomethingWentWrong: false });
    }

    renderRouter(): ReactElement {
        return (
            <Router key="router" />
        );
    }

    renderRootComponents(): ReactElement {
        return this.rootComponents.map((render) => render());
    }

    renderContextProviders(): ReactElement {
        const { isSomethingWentWrong } = this.state;

        const child = isSomethingWentWrong
            ? this.renderSomethingWentWrong.bind(this)
            : this.renderRootComponents.bind(this);

        return this.contextProviders.reduce(
            (acc, render) => render(acc),
            [child()] as ReactElement,
        );
    }

    renderSomethingWentWrong(): ReactElement {
        const { errorDetails = {} } = this.state;

        return (
            <SomethingWentWrong
              onClick={ this.handleErrorReset }
              errorDetails={ errorDetails }
              key="something-went-wrong"
            />
        );
    }

    render(): ReactElement {
        return this.renderContextProviders();
    }
}

export default AppComponent;
