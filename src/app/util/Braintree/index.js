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

/**
 * @TODO - remove Braintree from Americapass, once PWA core is updated to include it
 */

class Braintree {
    constructor(containerId) {
        this.containerId = containerId;
    }

    async create() {
        const { default: dropIn } = await import('braintree-web-drop-in');

        this.braintreeDropIn = await dropIn.create({
            authorization: 'sandbox_csvqffwm_dbd54pj8pd35czhb',
            container: `#${ this.containerId }`
        });
    }

    requestPaymentNonce = () => this.braintreeDropIn.requestPaymentMethod();
}

export default Braintree;
