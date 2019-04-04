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

    // Note: fields at the moment cannot be inside html tag (e.g. fieldset)
    static cloneChildren(originChildren, fieldCallback) {
        const executeClone = originChildren => Children.map(originChildren, (child) => {
            if (child && typeof child === 'object' && child.type && child.props) {
                const { type: { name }, props: { children } } = child;

                if (name === 'Field') {
                    return fieldCallback(child);
                }

                if (typeof children === 'object') {
                    return React.cloneElement(child, { children: executeClone(children) });
                }

                return child;
            }

            return child;
        });

        return executeClone(originChildren);
    }

    constructor(props) {
        super(props);

        this.state = {
            ...Form.updateChildrenRefs(props),
            fieldsAreValid: true
        };
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

        const children = Form.cloneChildren(
            propsChildren,
            (child) => {
                const { props: { id } } = child;
                const { message } = this.validateField(child);

                if (message) {
                    invalidFields.push(id);
                    return React.cloneElement(child, { message, formRef: refMap[id] });
                }

                return React.cloneElement(child, { formRef: refMap[id] });
            }
        );

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
