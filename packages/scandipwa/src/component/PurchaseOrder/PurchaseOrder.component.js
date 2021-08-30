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

import FormPortal from 'Component/FormPortal/FormPortal.component';
import Field from 'Component/PureForm/Field';
import FIELD_TYPE from 'Component/PureForm/Field/Field.config';

import './PurchaseOrder.style';

/** @namespace Component/PurchaseOrder/Component */
export class PurchaseOrder extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired
    };

    render() {
        const { id } = this.props;

        return (
            <FormPortal
              id={ id }
              name="PurchaseOrder"
            >
                <Field
                  type={ FIELD_TYPE.text }
                  attr={ {
                      id: 'purchaseOrderNumber',
                      name: 'purchaseOrderNumber',
                      placeholder: __('Purchase Order Number'),
                      'aria-label': __('Purchase Order Number')
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true
                  } }
                  addRequiredTag
                  mix={ { block: 'PurchaseOrderNumber', elem: 'Input' } }
                />
            </FormPortal>
        );
    }
}

export default PurchaseOrder;
