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

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import valdationConfig from './Form.config';

class Form extends Component {
    static updateChildrenRefs(props) {
        const { children: propsChildren } = props;
        const refMap = {};
        const children = Children.map(propsChildren, (child) => {
            const { type: { name }, props: { id } } = child;

            if (name === 'Field') {
                refMap[id] = React.createRef();
                return React.cloneElement(child, { formRef: refMap[id] });
            }

            return child;
        });

        return { children, refMap };
    }

    constructor(props) {
        super(props);

        this.state = {
            ...Form.updateChildrenRefs(props),
            fieldsAreValid: true
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { fieldsAreValid } = state;
        if (fieldsAreValid) return Form.updateChildrenRefs(props);
        return null;
    }

    addExtraProps(component, extraProps) {
        return React.cloneElement(component, { ...extraProps });
    }

    validateField(field) {
        const { refMap } = this.state;
        const { validation, id } = field.props;

        if (validation && id && refMap[id] && refMap[id].current) {
            const { current: inputNode } = refMap[id];

            for (let i = 0; i < validation.length; i++) {
                const rule = validation[i];

                if (valdationConfig[rule]) {
                    const validationRules = valdationConfig[rule];
                    const isValid = validationRules.validate(inputNode);

                    if (!isValid) return { message: validationRules.message };
                }
            }
        }

        return {};
    }

    handleFormSubmit(e) {
        const { refMap } = this.state;
        const { children: propsChildren, onSubmit, onError } = this.props;
        const invalidFields = [];

        e.preventDefault();

        const children = Children.map(propsChildren, (child) => {
            const { type: { name }, props: { id } } = child;

            if (name === 'Field') {
                const { message } = this.validateField(child);

                if (message) {
                    invalidFields.push(id);
                    return this.addExtraProps(child, { message, formRef: refMap[id] });
                }

                return this.addExtraProps(child, { formRef: refMap[id] });
            }

            return child;
        });

        this.setState({ children, fieldsAreValid: !invalidFields.length });

        const inputValues = Object.values(refMap).reduce((inputValues, input) => {
            const { current } = input;
            if (current && current.id && current.value) {
                const { id, value } = current;
                return { ...inputValues, [id]: value };
            }
            return inputValues;
        }, {});

        return !invalidFields.length
            ? onSubmit(inputValues)
            : onError(inputValues, invalidFields);
    }

    render() {
        const { children, fieldsAreValid } = this.state;

        return (
            <form
              block="Form"
              mods={ { isInvalid: !fieldsAreValid } }
              ref={ this.form }
              onSubmit={ e => this.handleFormSubmit(e) }
            >
                { children }
            </form>
        );
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

Form.defaultProps = {
    onSubmit: () => {},
    onError: () => {}
};

export default Form;
