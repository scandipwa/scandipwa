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

import contactForm from './ContactForm.form';

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
        return contactForm();
    }

    getFormProps() {
        const { onFormSubmit } = this.props;

        return {
            onSubmit: onFormSubmit
        };
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
