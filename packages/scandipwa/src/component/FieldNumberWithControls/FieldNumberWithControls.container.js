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

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';

import { EventsType, FieldAttrType } from 'Type/Field.type';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

import FieldNumberWithControls from './FieldNumberWithControls.component';

/**
 * Field Number With Controls
 * @class FieldNumberWithControlsContainer
 * @namespace Component/FieldNumberWithControls/Container */
export class FieldNumberWithControlsContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        attr: FieldAttrType.isRequired,
        events: EventsType.isRequired,
        setRef: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        value: PropTypes.number.isRequired
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
        const { attr: { min, defaultValue = min } = {} } = this.props;
        const { attr: { defaultValue: prevDefaultValue } = {} } = prevProps;

        if (defaultValue <= 0 || prevDefaultValue <= 0) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value: min });
        }

        if (defaultValue < min) {
            this.handleInitialLoad(min);
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

        const { value: stateValue } = this.state;

        // eslint-disable-next-line no-nested-ternary
        const rangedValue = value <= min ? min : value > max ? max : value;

        if (stateValue >= 0) {
            this.fieldRef.value = value;
            this.setState({ value: rangedValue });

            return rangedValue;
        }

        return null;
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
                autoComplete,
                autocomplete,
                defaultValue,
                ...attr
            } = {},
            value,
            events,
            setRef,
            isDisabled
        } = this.props;

        const { value: stateValue } = this.state;

        return {
            attr: {
                ...attr,
                autoComplete: autoComplete || autocomplete
            },
            value,
            events,
            setRef,
            isDisabled,
            stateValue
        };
    }

    render() {
        return (
            <FieldNumberWithControls
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FieldNumberWithControls;
