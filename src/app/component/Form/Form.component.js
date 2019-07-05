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
import Field from 'Component/Field';
import validationConfig from './Form.config';

class Form extends Component {
    static updateChildrenRefs(props) {
        const { children: propsChildren } = props;
        const refMap = {};
        const children = Form.cloneChildren(
            propsChildren,
            (child) => {
                const { props: { id } } = child;
                refMap[id] = React.createRef();
                return React.cloneElement(child, { formRef: refMap[id] });
            }
        );

        return { children, refMap };
    }

    static cloneChildren(originChildren, fieldCallback) {
        const executeClone = originChildren => Children.map(originChildren, (child) => {
            if (child && typeof child === 'object' && child.type && child.props) {
                const { type: { name }, props, props: { children } } = child;

                if (name === Field.prototype.constructor.name) {
                    return fieldCallback(child);
                }

                if (typeof children === 'object') {
                    return React.cloneElement(child, {
                        ...props,
                        children: executeClone(children)
                    });
                }

                return child;
            }

            return child;
        });

        return executeClone(originChildren);
    }

    static cloneAndValidateChildren(propsChildren, refMap) {
        const invalidFields = [];
        const children = Form.cloneChildren(
            propsChildren,
            (child) => {
                const { props: { id } } = child;
                const { message } = Form.validateField(child, refMap);

                if (message) {
                    invalidFields.push(id);
                    return React.cloneElement(child, { message, formRef: refMap[id] });
                }

                return React.cloneElement(child, { formRef: refMap[id] });
            }
        );

        return { children, fieldsAreValid: !invalidFields.length, invalidFields };
    }

    static validateField(field, refMap) {
        const { validation, id } = field.props;

        if (validation && id && refMap[id] && refMap[id].current) {
            const { current: inputNode } = refMap[id];

            for (let i = 0; i < validation.length; i++) {
                const rule = validation[i];

                if (validationConfig[rule]) {
                    const validationRules = validationConfig[rule];
                    const isValid = validationRules.validate(inputNode);

                    if (!isValid) return { message: validationRules.message };
                }
            }
        }

        return {};
    }

    constructor(props) {
        super(props);

        this.state = {
            ...Form.updateChildrenRefs(props),
            fieldsAreValid: true
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { refMap, fieldsAreValid } = state;
        const { children } = props;
        if (fieldsAreValid) return Form.updateChildrenRefs(props);
        return Form.cloneAndValidateChildren(children, refMap);
    }

    handleFormSubmit(e) {
        const { refMap } = this.state;
        const {
            children: propsChildren,
            onSubmitSuccess,
            onSubmitError,
            onSubmit
        } = this.props;

        e.preventDefault();
        onSubmit();

        const {
            children,
            fieldsAreValid,
            invalidFields
        } = Form.cloneAndValidateChildren(propsChildren, refMap);
        this.setState({ children, fieldsAreValid });

        const inputValues = Object.values(refMap).reduce((inputValues, input) => {
            const { current } = input;
            if (current && current.id && current.value) {
                const { id, value } = current;
                if (current.type === 'checkbox' || current.type === 'radio') {
                    const boolValue = value === 'true';
                    return { ...inputValues, [id]: boolValue };
                }
                return { ...inputValues, [id]: value };
            }
            return inputValues;
        }, {});

        return !invalidFields.length
            ? onSubmitSuccess(inputValues)
            : onSubmitError(inputValues, invalidFields);
    }

    render() {
        const { mix } = this.props;
        const { children, fieldsAreValid } = this.state;

        return (
            <form
              block="Form"
              mix={ mix }
              mods={ { isInvalid: !fieldsAreValid } }
              ref={ (ref) => { this.form = ref; } }
              onSubmit={ e => this.handleFormSubmit(e) }
            >
                { children }
            </form>
        );
    }
}

Form.propTypes = {
    onSubmitSuccess: PropTypes.func,
    onSubmitError: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string
    })
};

Form.defaultProps = {
    onSubmitSuccess: () => {},
    onSubmitError: () => {},
    onSubmit: () => {},
    mix: {}
};

export default Form;
