/* eslint-disable no-console */
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

import { PureComponent } from 'react';

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import FieldGroup from 'Component/FieldGroup';
import { ReactElement } from 'Type/Common.type';

import { PurchaseOrderComponentProps, PurchaseOrderComponentState } from './PurchaseOrder.type';

import './PurchaseOrder.style';

/** @namespace Component/PurchaseOrder/Component */
export class PurchaseOrderComponent<
P extends Readonly<PurchaseOrderComponentProps> = Readonly<PurchaseOrderComponentProps>,
S extends PurchaseOrderComponentState = PurchaseOrderComponentState,
> extends PureComponent<P, S> {
    render(): ReactElement {
        const { id } = this.props;

        return (
            <FieldGroup
              attr={ {
                  id,
                  name: 'PurchaseOrder',
              } }
            >
                <Field
                  type={ FieldType.TEXT }
                  attr={ {
                      id: 'purchaseOrderNumber',
                      name: 'purchaseOrderNumber',
                      placeholder: __('Purchase Order Number'),
                      'aria-label': __('Purchase Order Number'),
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                  } }
                  addRequiredTag
                  mix={ { block: 'PurchaseOrderNumber', elem: 'Input' } }
                />
            </FieldGroup>
        );
    }
}

export default PurchaseOrderComponent;
