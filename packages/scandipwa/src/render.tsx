/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
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

// eslint-disable-next-line react/no-deprecated
import { render } from 'react-dom';

import App from 'Component/App';
import { waitForPriorityLoad } from 'Util/Request/LowPriorityLoad';

import 'Style/main';

// let's register service-worker
waitForPriorityLoad().then(
    /** @namespace Render/waitForPriorityLoad/then */
    () => {
        if ('serviceWorker' in navigator) {
            const swUrl = '/service-worker.js';
            navigator.serviceWorker.register(swUrl, { scope: '/' });
        }

        if (window.metaHtml) {
            const doc = new DOMParser().parseFromString(window.metaHtml, 'text/html');
            Object.values(doc?.head?.children || {}).forEach((node) => document.head.appendChild(node));
        }
    },
);

// Code bellow enables the hot reloading of plugins
// Why? I have no idea. Further debugging needed.
// TODO: understand why this helps HMR
if (module.hot) {
    module.hot.accept();
}

function HotApp() {
    return <App />;
}

render(<HotApp />, document.getElementById('root'));
