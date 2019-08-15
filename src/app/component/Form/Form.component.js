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

import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import Field from 'Component/Field';
import validationConfig from './Form.config';

class Form extends PureComponent {
    static updateChildrenRefs(props) {
        const { children: propsChildren } = props;
        const refMap = {};
        const children = Form.cloneChildren(
            propsChildren,
            (child) => {
                const { props: { name } } = child;
                refMap[name] = React.createRef();
                return React.cloneElement(child, { formRef: refMap[name] });
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
                const { props: { id, name } } = child;
                const { message } = Form.validateField(child, refMap);

                if (message) {
                    invalidFields.push(id);
                    return React.cloneElement(child, { message, formRef: refMap[name] });
                }

                return React.cloneElement(child, { formRef: refMap[name] });
            }
        );

        return { children, fieldsAreValid: !invalidFields.length, invalidFields };
    }

    static validateField(field, refMap) {
        const { validation, id, name } = field.props;

        if (validation && id && refMap[name] && refMap[name].current) {
            const { current: inputNode } = refMap[name];

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
                const { name, value, checked } = current;
                if (current.type === 'checkbox') {
                    const boolValue = checked;
                    return { ...inputValues, [name]: boolValue };
                }
                return { ...inputValues, [name]: value };
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
