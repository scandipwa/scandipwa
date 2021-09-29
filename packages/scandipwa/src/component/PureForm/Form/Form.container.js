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

import FIELD_TYPE from 'Component/PureForm/Field/Field.config';
import { ChildrenType, MixType } from 'Type/Common';
import getFieldsData from 'Util/Form/Extract';
import { validateGroup } from 'Util/Validator';

import Form from './Form.component';

/**
 * Form
 * @class FormContainer
 * @namespace Component/PureForm/Form/Container
 */
export class FormContainer extends PureComponent {
    static propTypes = {
        // Form attributes
        children: ChildrenType,
        attr: PropTypes.object,
        events: PropTypes.object,
        onSubmit: PropTypes.func,
        onError: PropTypes.func,
        returnAsObject: PropTypes.bool,

        // Validation
        validationRule: PropTypes.object,
        validateOn: PropTypes.array,
        showErrorAsLabel: PropTypes.bool,

        // Labels
        label: PropTypes.string,
        subLabel: PropTypes.string,

        mix: MixType
    };

    static defaultProps = {
        attr: {},
        events: {},
        validationRule: {},
        validateOn: [],
        showErrorAsLabel: true,
        label: '',
        subLabel: '',
        onSubmit: null,
        onError: null,
        children: [],
        returnAsObject: false,
        mix: {}
    };

    state = {
        validationResponse: null
    };

    containerFunctions = {
        validate: this.validate.bind(this),
        setRef: this.setRef.bind(this),
        onSubmit: this.onSubmit.bind(this)
    };

    formRef = createRef();

    //#region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount() {
        const { validationRule } = this.props;

        if (this.formRef && validationRule && Object.keys(validationRule).length > 0) {
            this.formRef.removeEventListener('validate', this.validate.bind(this));
        }
    }

    // Adds validation event listener to field
    setRef(elem) {
        const { validationRule } = this.props;

        if (elem && this.formRef !== elem) {
            this.formRef = elem;

            if (validationRule && Object.keys(validationRule).length > 0) {
                elem.addEventListener('validate', this.validate.bind(this));
            }
        }
    }

    validate(data) {
        const { validationRule } = this.props;
        const output = validateGroup(this.formRef, validationRule);

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && output !== true) {
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
        this.validate();

        if (typeof hook === 'function') {
            this.surroundEvent(hook, ...args);
        }
    }

    surroundEvent(hook, ...args) {
        const { attr, returnAsObject } = this.props;
        const fields = getFieldsData(
            this.formRef,
            false,
            [FIELD_TYPE.number, FIELD_TYPE.button],
            returnAsObject
        );

        hook(...[...args, { ...attr, formRef: this.formRef, fields }]);
    }
    //#endregion

    async onSubmit(e) {
        e.preventDefault();

        const { onSubmit, onError, returnAsObject = false } = this.props;
        const fields = getFieldsData(
            this.formRef, false, [FIELD_TYPE.number, FIELD_TYPE.button], returnAsObject
        );
        const isValid = validateGroup(this.formRef);

        if (isValid !== true) {
            if (typeof onError === 'function') {
                onError(this.formRef, fields, isValid);
            }

            return;
        }

        if (typeof onSubmit === 'function') {
            onSubmit(this.formRef, fields);
        }
    }

    containerProps() {
        const {
            events,
            validateOn,
            children,
            attr,
            showErrorAsLabel,
            label,
            subLabel,
            mix
        } = this.props;
        const { validate, onSubmit } = this.containerFunctions;
        const { validationResponse } = this.state;

        const newEvents = { };
        Object.keys(events).forEach((eventName) => {
            const { [eventName]: event } = events;
            newEvents[eventName] = this.surroundEvent.bind(this, event);
        });

        // Surrounds events with validation
        validateOn.forEach((eventName) => {
            const { [eventName]: baseEvent } = events;
            newEvents[eventName] = baseEvent ? this.validateOnEvent.bind(this, baseEvent) : validate;
        });

        return {
            validationResponse,
            children,
            attr,
            showErrorAsLabel,
            label,
            subLabel,
            mix,
            events: {
                ...newEvents,
                onSubmit
            }
        };
    }

    render() {
        return (
            <Form
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FormContainer;
