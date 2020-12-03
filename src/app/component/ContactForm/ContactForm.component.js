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

import FieldForm from 'Component/FieldForm';
import Loader from 'Component/Loader';

import './ContactForm.style';

/** @namespace Component/ContactForm/Component */
export class ContactForm extends FieldForm {
    static propTypes = {
        isLoading: PropTypes.bool,
        onFormSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    get fieldMap() {
        return {
            name: {
                validation: ['notEmpty'],
                label: __('Name')
            },
            email: {
                validation: ['notEmpty', 'email'],
                label: __('Email')
            },
            telephone: {
                label: __('Phone number')
            },
            message: {
                type: 'textarea',
                validation: ['notEmpty'],
                label: __('What\'s on your mind?')
            }
        };
    }

    onFormSuccess = this.onFormSuccess.bind(this);

    onFormSuccess(fields) {
        const { onFormSubmit } = this.props;
        onFormSubmit(fields);
    }

    renderActions() {
        const { isLoading } = this.props;

        return (
            <>
                <Loader isLoading={ isLoading } />
                <button type="submit" block="Button">
                    { __('Send Your message') }
                </button>
            </>
        );
    }

    render() {
        return (
            <div block="ContactForm">
                { super.render() }
            </div>
        );
    }
}

export default ContactForm;
