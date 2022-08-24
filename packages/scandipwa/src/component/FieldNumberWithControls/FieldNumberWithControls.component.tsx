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

import AddIcon from 'Component/AddIcon';
import { FieldType } from 'Component/Field/Field.config';
import { FieldReactEvents } from 'Component/Field/Field.type';
import MinusIcon from 'Component/MinusIcon';
import { ReactElement } from 'Type/Common.type';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Product.type';

import { FieldNumberComponentProps } from './FieldNumber.type';

import './FieldNumberWithControls.style.scss';
/**
 * Field Number With Controls
 * @class FieldNumberWithControls
 * @namespace Component/FieldNumberWithControls/FieldNumber/Component */
export class FieldNumberWithControls extends PureComponent<FieldNumberComponentProps> {
    render(): ReactElement {
        const {
            attr,
            attr: { min = 1, max = DEFAULT_MAX_PRODUCTS },
            value,
            events,
            setRef,
            stateValue,
            handleValueChange,
            isDisabled
        } = this.props;

        const numberValue = +value || +stateValue;

        return (
            <>
                <input
                  ref={ (elem) => setRef(elem) }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...attr }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...events as FieldReactEvents<HTMLInputElement> }
                  value={ value }
                  type={ FieldType.NUMBER }
                  readOnly
                  aria-label={ __('Value') }
                  disabled={ isDisabled }
                />
                <button
                  disabled={ max === 1 || numberValue >= max || isDisabled }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleValueChange(numberValue + 1) }
                  aria-label={ __('Add') }
                  type={ FieldType.BUTTON }
                >
                    <AddIcon block="SubtractButton" isPrimary />
                </button>
                <button
                  disabled={ numberValue + 1 === min || numberValue <= min || isDisabled }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleValueChange(numberValue - 1) }
                  aria-label={ __('Subtract') }
                  type={ FieldType.BUTTON }
                >
                    <MinusIcon block="AddButton" isPrimary />
                </button>
            </>
        );
    }
}

export default FieldNumberWithControls;
