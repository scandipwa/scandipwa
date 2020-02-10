/* eslint-disable func-names */
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

const extensionConfig = [];
const importAll = (request) => {
    // eslint-disable-next-line no-return-assign
    request.keys().forEach(key => extensionConfig.push(request(key).default));
};

importAll(require.context('../../@scandipwa/', true, /\.plugin\.js$/));

window.plugins = extensionConfig.reduce(
    (config, extension) => {
        // Retrieve plugin config as in file that exports it
        const singleExtensionConfig = Object.entries(extension);
        singleExtensionConfig.forEach(([namespace, classConfig]) => {
            if (!config[namespace]) {
                config[namespace] = {};
            }
            Object.entries(classConfig).forEach(([methodName, methodPlugins]) => {
                if (!config[namespace][methodName]) {
                    config[namespace][methodName] = {};
                }
                Object.entries(methodPlugins).forEach(([pluginType, [plugin]]) => {
                    if (!config[namespace][methodName][pluginType]) {
                        config[namespace][methodName][pluginType] = [];
                    }
                    config[namespace][methodName][pluginType].push(plugin);
                });
            });
        });

        return config;
    }, {}
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
