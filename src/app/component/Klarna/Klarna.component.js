/* eslint-disable no-undef */
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
import PropTypes from 'prop-types';
import Html from 'Component/Html';

export default class KlarnaComponent extends PureComponent {
    static propTypes = {};

    static isFirstLoad = true;

    initiateKlarna() {
        // TODO? get client token first
    }

    renderScript() {
        if (!KlarnaComponent.isFirstLoad) return null;

        KlarnaComponent.isFirstLoad = false;
        window.klarnaAsyncCallback = this.initiateKlarna;

        return (
            <Html
              content="<script src='https://x.klarnacdn.net/kp/lib/v1/api.js' async></script>"
            />
        );
    }

    render() {
        return (
            <>
                { this.renderScript() }
            </>
        );
    }
}
