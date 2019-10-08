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

import React, { PureComponent } from 'react';
import PayPal from './PayPal.component';

export const PAYPAL_SCRIPT = 'PAYPAL_SCRIPT';

export class PayPalContainer extends PureComponent {
    static propTypes = {

    };

    componentDidMount() {
        const script = document.getElementById(PAYPAL_SCRIPT);
        script.onload = () => this.forceUpdate();
    }

    getPayPal() {
        const { paypal } = window;
        return paypal;
    }

    render() {
        return <PayPal paypal={ this.getPayPal() } />;
    }
}

export default PayPalContainer;
