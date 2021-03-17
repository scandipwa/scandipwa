/* eslint-disable no-console */
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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field/Field.container';

/** @namespace Component/PurchaseOrder/Component */
export class PurchaseOrder extends PureComponent {
    static propTypes = {
        onPurchaseOrderNumberChange: PropTypes.func.isRequired,
        setOrderButtonEnableStatus: PropTypes.func.isRequired
    };

    handlePurchaseOrderNumberChange = (enteredPurchaseOrderNumber) => {
        const { setOrderButtonEnableStatus } = this.props;
        setOrderButtonEnableStatus(!!enteredPurchaseOrderNumber);
    };

    render() {
        const { onPurchaseOrderNumberChange } = this.props;

        return (
            <Field
              type="text"
              id="purchaseOrderNumber"
              name="purchaseOrderNumber"
              label={ __('Purchase Order Number') }
              validation={ ['notEmpty'] }
              placeholder={ __('Purchase Order Number') }
              onChange={ onPurchaseOrderNumberChange }
              mix={ { block: 'PurchaseOrderNumber', elem: 'Input' } }
              aria-label={ __('Purchase Order Number') }
            />
        );
    }
}

export default PurchaseOrder;
