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

import AddIcon from 'Component/AddIcon';
import { FieldType } from 'Component/Field/Field.config';
import MinusIcon from 'Component/MinusIcon';
import { ReactElement } from 'Type/Common.type';
import { EventsType, FieldAttrType } from 'Type/Field.type';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

/**
 * Field Number
 * @class FieldNumber
 * @namespace Component/FieldNumber/Component */
export class FieldNumber extends PureComponent {
    static propTypes = {
        attr: FieldAttrType.isRequired,
        events: EventsType.isRequired,
        setRef: PropTypes.func.isRequired,
        value: PropTypes.number.isRequired,
        handleValueChange: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired
    };

    render(): ReactElement {
        const {
            attr,
            attr: { min = 1, max = DEFAULT_MAX_PRODUCTS },
            events,
            setRef,
            value,
            handleValueChange,
            isDisabled
        } = this.props;

        return (
            <>
                <input
                  ref={ (elem) => setRef(elem) }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...attr }
                  // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                  { ...events }
                  type={ FieldType.NUMBER }
                  readOnly
                  aria-label={ __('Value') }
                  value={ value }
                  disabled={ isDisabled }
                />
                <button
                  disabled={ +value === max || isDisabled }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleValueChange(+value + 1) }
                  aria-label={ __('Add') }
                  type={ FieldType.BUTTON }
                >
                    <AddIcon block="SubtractButton" isPrimary />
                </button>
                <button
                  disabled={ +value === min || isDisabled }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleValueChange(+value - 1) }
                  aria-label={ __('Subtract') }
                  type={ FieldType.BUTTON }
                >
                    <MinusIcon block="AddButton" isPrimary />
                </button>
            </>
        );
    }
}

export default FieldNumber;
