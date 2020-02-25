/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

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

import { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Provider as UnstatedProvider } from 'unstated';
import AppRouter from 'Route';
import store from 'Store';
import ReactDOM from 'react-dom';
import SharedTransition from 'Component/SharedTransition';

import 'Style/main';
import extensionsConfig from './pluginconfig.json';

const { plugins } = extensionsConfig;

const pendingPluginConfigParts = [];
Object.entries(plugins).forEach(([, configFilePathList]) => {
    configFilePathList.forEach(configFilePath => pendingPluginConfigParts.push(
        import(`../../vendor/${configFilePath}.plugin.js`)
    ));
});

Promise.all(pendingPluginConfigParts).then(
    (modules) => {
        window.plugins = modules.map(singleModule => singleModule.default).reduce(
            (config, extension) => {
                const singleExtensionConfig = Object.entries(extension);
                singleExtensionConfig.forEach(
                    ([namespace, methodsPlugins]) => {
                        if (!config[namespace]) {
                            config[namespace] = {};
                        }
                        Object.entries(methodsPlugins).forEach(
                            ([methodName, methodPlugins]) => {
                                if (!config[namespace][methodName]) {
                                    config[namespace][methodName] = [];
                                }
                                config[namespace][methodName].push(...methodPlugins);
                            }
                        );
                    }
                );

                return config;
            }, {}
        );
    }
);

// Disable react dev tools in production
if (process.env.NODE_ENV === 'production'
    && window.__REACT_DEVTOOLS_GLOBAL_HOOK__
) window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};

// Enable React hot reload in development
if (process.env.NODE_ENV === 'development') {
    module.hot.accept('./index.js', () => {
        // eslint-disable-next-line import/no-self-import, global-require
        const NextRootContainer = require('./index.js').default;
        ReactDOM.render(<NextRootContainer />, document.getElementById('root'));
    });
}

class App extends PureComponent {
    render() {
        return (
            <Provider store={ store }>
                <UnstatedProvider>
                    <AppRouter />
                    <SharedTransition />
                </UnstatedProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
