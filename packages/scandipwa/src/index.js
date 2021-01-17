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

import 'Util/Extensions';
import 'Util/Polyfill';
import 'Style/main';

import { render } from 'react-dom';

import App from 'Component/App';

// let's register service-worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swUrl = 'service-worker.js';
        navigator.serviceWorker.register(swUrl, { scope: '/' });
    });
}

render(<App />, document.getElementById('root'));
