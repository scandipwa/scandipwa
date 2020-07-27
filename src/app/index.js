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

import 'Util/Polyfill';
import 'Style/main';

import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as UnstatedProvider } from 'unstated';

import SharedTransition from 'Component/SharedTransition';
import AppRouter from 'Route';
import configureStore from 'Store';

// Disable react dev tools in production
if (process.env.NODE_ENV === 'production'
    && window.__REACT_DEVTOOLS_GLOBAL_HOOK__
) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
}

// Enable React hot reload in development
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./index.js', () => {
        // eslint-disable-next-line import/no-self-import, global-require
        const NextRootContainer = require('./index.js').default;
        ReactDOM.render(<NextRootContainer />, document.getElementById('root'));
    });
}

// Inject ScandiPWA comment into code (do not remove!)
const comment = document.createComment('Powered by ScandiPWA (scandipwa.com)');
document.querySelector('html').appendChild(comment);

class App extends PureComponent {
    render() {
        return (
            <Provider store={ configureStore() }>
                <UnstatedProvider>
                    <AppRouter />
                    <SharedTransition />
                </UnstatedProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
