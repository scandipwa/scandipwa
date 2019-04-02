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
    constructor(props) {
        super(props);

        const { children: propsChildren } = this.props;

        this.refMap = {};

        const children = Children.map(propsChildren, (child) => {
            const { type: { name }, props: { id } } = child;

            if (name === 'Field') {
                this.refMap[id] = React.createRef();
                return React.cloneElement(child, { formRef: this.refMap[id] });
            }

            return child;
        });

        this.state = { children };
    }

    addExtraProps(component, extraProps) {
        return React.cloneElement(component, { ...extraProps });
    }

    validateField(field) {
        const { validation, id } = field.props;

        if (validation && id && this.refMap[id] && this.refMap[id].current) {
            const { current: inputNode } = this.refMap[id];            

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
        e.preventDefault();

        let fieldsAreValid = true;

        const { children: propsChildren, onSubmit, onError } = this.props;

        const children = Children.map(propsChildren, (child) => {
            const { type: { name }, props: { id } } = child;

            if (name === 'Field') {
                const { message } = this.validateField(child);

                if (message) {
                    fieldsAreValid = false;
                    return this.addExtraProps(
                        child,
                        {
                            message,
                            formRef: this.refMap[id]
                        }
                    );
                }
            }

            return child;
        });

        this.setState({ children });

        return fieldsAreValid ? onSubmit() : onError();
    }

    render() {
        const { children } = this.state;

        return (
            <form ref={ this.form } onSubmit={ e => this.handleFormSubmit(e) }>
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
