/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';

import contactForm from './ContactForm.form';
import { ContactFormComponentProps } from './ContactForm.type';

import './ContactForm.style';

/** @namespace Component/ContactForm/Component */
export class ContactForm extends FieldForm<ContactFormComponentProps> {
    static defaultProps: Partial<ContactFormComponentProps> = {
        isLoading: false
    };

    fieldMap(): Partial<FieldContainerProps>[] {
        return contactForm();
    }

    getFormProps(): Partial<FormContainerProps> {
        const { onFormSubmit } = this.props;

        return {
            onSubmit: onFormSubmit
        };
    }

    renderActions(): ReactElement {
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

    render(): ReactElement {
        return (
            <div block="ContactForm">
                { super.render() }
            </div>
        );
    }
}

export default ContactForm;
