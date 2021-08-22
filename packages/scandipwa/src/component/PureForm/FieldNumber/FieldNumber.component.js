/* eslint-disable */
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

import AddIcon from 'Component/AddIcon';
import MinusIcon from 'Component/MinusIcon';
import { FIELD_TYPE } from 'Config/Field.config';

export class FieldNumber extends PureComponent {
    static propTypes = {
        attr: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        setRef: PropTypes.func.isRequired,
        value: PropTypes.number.isRequired,
        handleValueChange: PropTypes.func.isRequired,
    };

    render() {
        const {
            attr,
            attr: { min = 1, max = 9999 },
            events,
            setRef,
            value,
            handleValueChange
        } = this.props;

        return (
            <>
                <input
                    ref={ (elem) => setRef(elem) }
                    { ...attr }
                    { ...events }
                    type={ FIELD_TYPE.number }
                    readOnly
                    aria-label={ __('Value') }
                    value={ value }
                />
                <button
                    disabled={ +value === max }
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={ () => handleValueChange(+value + 1) }
                    aria-label={ __('Add') }
                    type={ FIELD_TYPE.button }
                >
                    <AddIcon block="SubtractButton" isPrimary />
                </button>
                <button
                    disabled={ +value === min }
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={ () => handleValueChange(+value - 1) }
                    aria-label={ __('Subtract') }
                    type={ FIELD_TYPE.button }
                >
                    <MinusIcon block="AddButton" isPrimary />
                </button>
            </>
        );
    }
}

export default FieldNumber;
