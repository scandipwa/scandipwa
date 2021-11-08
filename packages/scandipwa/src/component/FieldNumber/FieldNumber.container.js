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

import { EventsType, FieldAttrType } from 'Type/Field.type';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

import FieldNumber from './FieldNumber.component';

/**
 * Field Number
 * @class FieldNumberContainer
 * @namespace Component/FieldNumber/Container */
export class FieldNumberContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        attr: FieldAttrType.isRequired,
        events: EventsType.isRequired,
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
        this.handleInitialLoad(defaultValue);
    }

    componentDidUpdate(prevProps) {
        const { attr: { value, defaultValue = 0 } = {} } = this.props;
        const { attr: { value: prevValue, defaultValue: prevDefaultValue } = {} } = prevProps;

        if (defaultValue !== prevDefaultValue) {
            this.handleInitialLoad(defaultValue);
        }

        if (value !== prevValue) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value });
        }
    }

    setRef(elem) {
        const { setRef } = this.props;
        setRef(elem);

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
        }
    }

    setValue(value) {
        const {
            attr: { min = 0, max = DEFAULT_MAX_PRODUCTS } = {}
        } = this.props;

        // eslint-disable-next-line no-nested-ternary
        const rangedValue = value < min ? min : value > max ? max : value;

        this.fieldRef.value = value;
        this.setState({ value: rangedValue });

        return rangedValue;
    }

    handleInitialLoad(value) {
        const {
            events: { onLoad } = {}
        } = this.props;

        const newValue = this.setValue(value);

        if (typeof onLoad === 'function') {
            onLoad(newValue);
        }
    }

    handleValueChange(value) {
        const {
            events: { onChange } = {}
        } = this.props;

        const newValue = this.setValue(value);

        if (typeof onChange === 'function') {
            onChange(newValue);
        }
    }

    containerProps() {
        const {
            attr: {
                value,
                autoComplete,
                autocomplete,
                defaultValue,
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
            value: stateValue
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
