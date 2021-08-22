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

import Form from './Form.component';
import { validateGroup } from 'Util/Validator';
import { ChildrenType } from 'Type/Common';

export class FormContainer extends PureComponent {
    static propTypes = {
        // Form attributes
        children: ChildrenType,
        attr: PropTypes.object,
        events: PropTypes.object,
        onSubmit: PropTypes.func,

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
        validationRule: {},
        validateOn: [],
        showErrorAsLabel: true,
        label: '',
        subLabel: '',
        onSubmit: null,
        children: []
    };

    state = {
        validationResponse: null
    }

    containerFunctions = {
        validate: this.validate.bind(this)
    }

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
        if (!validationRule || Object.keys(validationRule).length === 0) {
            return;
        }

        if (elem && this.formRef !== elem) {
            this.formRef = elem;
            elem.addEventListener('validate', this.validate.bind(this));
        }
    }

    validate(data) {
        const { validationRule } = this.props;
        const output = validateGroup(this.formRef, validationRule);

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && output !== true) {
            if (!data.detail.errors) {
                data.detail.errors = [];
            }
            data.detail.errors.push(output);
        }
        this.setState({ validationResponse: output });

        return output;
    }

    validateOnEvent(hook) {
        this.validate();
        if (hook) {
            hook();
        }
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
            setRef: this.setRef.bind(this)
        }
    }

    render() {
        return <Form
            { ...this.containerProps() }
        />
    }
}

export default FormContainer;
