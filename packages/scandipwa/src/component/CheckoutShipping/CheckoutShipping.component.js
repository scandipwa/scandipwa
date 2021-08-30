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

import { CheckoutStep } from 'Component/CheckoutStep/CheckoutStep.component';
import LockIcon from 'Component/LockIcon';

import './CheckoutShipping.style';

/** @namespace Component/CheckoutShipping/Component */
export class CheckoutShipping extends CheckoutStep {
    actionLabel = (
        <>
            <LockIcon />
            { __('Proceed to billing') }
        </>
    );

    renderBody() {
        // Renders shipping methods
        return <div>Hello!</div>;
    }
}

export default CheckoutShipping;
