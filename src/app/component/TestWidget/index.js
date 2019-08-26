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

import React from 'react';
import './TestWidget.style';

const TestWidget = (...args) => (
    <code block="TestWidget">
        {
            args.map(arg => (
                Object.entries(arg).map(
                    ([key, value]) => `${key}: ${value}`
                ).join(', ')
            ))
        }
    </code>
);

export default TestWidget;
