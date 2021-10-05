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
import { createRef, PureComponent } from 'react';

import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

import FieldNumber from './FieldNumber.component';

/**
 * Field Number
 * @class FieldNumberContainer
 * @namespace Component/PureForm/FieldNumber/Container
 */
export class FieldNumberContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        attr: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        setRef: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired
    };

    state = {
        value: 0
    };

    containerFunctions = {
        handleValueChange: this.handleValueChange.bind(this),
        setRef: this.setRef.bind(this)
    };

    fieldRef = createRef();

    componentDidMount() {
        const { attr: { defaultValue = 0 } } = this.props;
        this.handleValueChange(defaultValue);
    }

    setRef(elem) {
        const { setRef } = this.props;
        setRef(elem);

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
        }
    }

    handleValueChange(value) {
        const {
            events: { onChange } = {},
            attr: { min = 0, max = DEFAULT_MAX_PRODUCTS } = {}
        } = this.props;

        // eslint-disable-next-line no-nested-ternary
        const rangedValue = value < min ? min : value > max ? max : value;

        if (typeof onChange === 'function') {
            this.fieldRef.value = rangedValue;
            onChange(rangedValue);
        }

        this.setState({ value: rangedValue });
    }

    containerProps() {
        const {
            attr: {
                value,
                autoComplete,
                autocomplete,
                ...attr
            } = {},
            events,
            setRef,
            isDisabled
        } = this.props;
        const { value: stateValue } = this.state;

        return {
            attr: {
                ...attr,
                value,
                autoComplete: autoComplete || autocomplete
            },
            events,
            setRef,
            isDisabled,
            value: value || stateValue
        };
    }

    render() {
        return (
            <FieldNumber
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FieldNumber;
