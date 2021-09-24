/* eslint-disable spaced-comment */
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

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { MixType } from 'Type/Common';
import { validate } from 'Util/Validator';

import Field from './Field.component';

/**
 * Field
 * @class FieldContainer
 * @namespace Component/PureForm/Field/Container
 */
export class FieldContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        type: PropTypes.oneOf(Object.values(FIELD_TYPE)),
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
        subLabel: PropTypes.string,
        addRequiredTag: PropTypes.bool
    };

    static defaultProps = {
        type: FIELD_TYPE.text,
        attr: {},
        events: {},
        mix: {},
        validationRule: {},
        validateOn: [],
        options: [],
        showErrorAsLabel: true,
        isDisabled: false,
        addRequiredTag: false,
        label: '',
        subLabel: ''
    };

    state = {
        validationResponse: null
    };

    containerFunctions = {
        validate: this.validate.bind(this)
    };

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

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;
            if (!validationRule || Object.keys(validationRule).length === 0) {
                return;
            }
            elem.addEventListener('validate', this.validate.bind(this));
        }
    }

    validate(data) {
        const { validationRule, type, attr: { name } = {} } = this.props;
        const value = type === FIELD_TYPE.checkbox || type === FIELD_TYPE.radio
            ? !!this.fieldRef.checked
            : this.fieldRef.value;
        const response = validate(value, validationRule);
        const output = response !== true ? { ...response, type, name } : response;

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && response !== true) {
            if (!data.detail.errors) {
                // eslint-disable-next-line no-param-reassign
                data.detail.errors = [];
            }
            data.detail.errors.push(output);
        }
        this.setState({ validationResponse: output });

        return output;
    }

    validateOnEvent(hook, ...args) {
        if (hook) {
            const { attr, type } = this.props;
            const { value } = this.fieldRef;
            hook(...[...args, {
                ...attr, fieldRef: this.fieldRef, value, type
            }]);
        }
        this.validate();
    }
    //#endregion

    containerProps() {
        const {
            events,
            validateOn,
            type,
            attr,
            isDisabled,
            mix,
            options,
            showErrorAsLabel,
            label,
            subLabel,
            addRequiredTag
        } = this.props;
        const { validationResponse } = this.state;
        const { validate } = this.containerFunctions;

        // Surrounds events with validation
        const newEvents = { ...events };
        validateOn.forEach((eventName) => {
            const { [eventName]: baseEvent } = events;
            newEvents[eventName] = baseEvent ? this.validateOnEvent.bind(this, baseEvent) : validate;
        });

        return {
            type,
            attr,
            isDisabled,
            mix,
            options,
            showErrorAsLabel,
            label,
            subLabel,
            addRequiredTag,
            validationResponse,
            events: newEvents,
            fieldRef: this.fieldRef,
            setRef: this.setRef.bind(this)
        };
    }

    render() {
        return (
            <Field
              { ...this.containerProps() }
            />
        );
    }
}

export default FieldContainer;
