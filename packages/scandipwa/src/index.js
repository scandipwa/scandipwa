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

import PropTypes from 'prop-types';
import { render } from 'react-dom';

import App from 'Component/App';

// TODO: move this out to i18-runtime
PropTypes.string = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
]);

// let's register service-worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swUrl = '/service-worker.js';
        navigator.serviceWorker.register(swUrl, { scope: '/' });
    });
}

render(<App />, document.getElementById('root'));
