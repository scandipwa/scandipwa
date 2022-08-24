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
import { ReactElement } from 'Type/Common.type';

import { CheckoutPaymentComponentProps } from './CheckoutPayment.type';

import './CheckoutPayment.style';

/** @namespace Component/CheckoutPayment/Component */
export class CheckoutPayment extends PureComponent<CheckoutPaymentComponentProps> {
    static defaultProps = {
        isSelected: false
    };

    __construct(props: CheckoutPaymentComponentProps): void {
        super.__construct?.(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(): void {
        const {
            onClick,
            method
        } = this.props;

        onClick(method);
    }

    render(): ReactElement {
        const {
            isSelected,
            method: { title }
        } = this.props;

        // disable checkbox in order to skip direct clicks on checkbox and handle clicks on entire button instead
        return (
            <li block="CheckoutPayment">
                <button
                  block="CheckoutPayment"
                  mods={ { isSelected } }
                  elem="Button"
                  type="button"
                  onClick={ this.onClick }
                >
                    <Field
                      type={ FieldType.CHECKBOX }
                      attr={ {
                          id: `option-${ title }`,
                          name: `option-${ title }`,
                          checked: isSelected
                      } }
                      label={ title }
                      isDisabled={ false }
                    />
                </button>
            </li>
        );
    }
}

export default CheckoutPayment;
