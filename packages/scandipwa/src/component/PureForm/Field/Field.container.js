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
import { createRef, PureComponent } from 'react';

import { FIELD_TYPE } from 'Config/Field.config';

import Field from './Field.component';
import { MixType } from 'Type/Common';
import { validate } from 'Util/Validator';

export class FieldContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        type: PropTypes.oneOf(Object.values(FIELD_TYPE)).isRequired,
        attr: PropTypes.object,
        events: PropTypes.object,
        isDisabled: PropTypes.bool,
        mix: MixType,
        options: PropTypes.array,

        // Validation
        validationRule: PropTypes.object,
        validateOn: PropTypes.array,
        showErrorAsLabel: PropTypes.bool,

        // Labels
        label: PropTypes.string,
        subLabel: PropTypes.string
    };

    static defaultProps = {
        attr: {},
        events: {},
        mix: {},
        validationRule: {},
        validateOn: [],
        options: [],
        showErrorAsLabel: true,
        isDisabled: false,
        label: '',
        subLabel: ''
    };

    state = {
        validationResponse: null
    }

    containerFunctions = {
        validate: this.validate.bind(this)
    }

    fieldRef = createRef();

    //#region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount() {
        const { validationRule } = this.props;

        if (this.fieldRef && validationRule && Object.keys(validationRule).length > 0) {
            this.fieldRef.removeEventListener('validate', this.validate.bind(this));
        }
    }

    // Adds validation event listener to field
    setRef(elem) {
        const { validationRule } = this.props;
        if (!validationRule || Object.keys(validationRule).length === 0) {
            return;
        }

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
            elem.addEventListener('validate', this.validate.bind(this));
        }
    }

    validate(data) {
        const { validationRule, type, attr: { name } = {} } = this.props;
        const value = this.fieldRef.value;
        const response = validate(value, validationRule);
        const output = response !== true ? { ...response, type, name } : response;

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && response !== true) {
            if (!data.detail.errors) {
                data.detail.errors = [];
            }
            data.detail.errors.push(output);
        }
        this.setState({ validationResponse: output });

        return output;
    }

    validateOnEvent(hook, ...args) {
        if (hook) {
            const value = this.fieldRef.value;
            hook(...[...args, value]);
        }
        this.validate();
    }
    //#endregion

    containerProps() {
        const { events, validateOn } = this.props;
        const { validate } = this.containerFunctions;

        // Surrounds events with validation
        // TODO: Optimize
        const newEvents = { ...events };
        validateOn.forEach((eventName) => {
            const { [eventName]: baseEvent } = events;
            newEvents[eventName] = baseEvent ?  this.validateOnEvent.bind(this, baseEvent) : validate
        });

        return {
            ...this.state,
            ...this.props,
            events: newEvents,
            fieldRef: this.fieldRef,
            setRef: this.setRef.bind(this)
        }
    }

    render() {
        return <Field
            { ...this.containerProps() }
        />
    }
}

export default FieldContainer;
