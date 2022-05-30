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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FormFields } from 'Component/Form/Form.type';
import { ReactElement } from 'Type/Common.type';
import { FieldValue } from 'Util/Form/Form.type';
import { RootState } from 'Util/Store/Store.type';

import ContactForm from './ContactForm.component';
import {
    ContactFormComponentContainerPropKeys,
    ContactFormComponentProps,
    ContactFormContainerMapDispatchProps,
    ContactFormContainerMapStateProps,
    ContactFormContainerProps
} from './ContactForm.type';

export const ContactFormDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ContactForm/ContactForm.dispatcher'
);

/** @namespace Component/ContactForm/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ContactFormContainerMapStateProps => ({
    isLoading: state.ContactFormReducer.isLoading
});

/** @namespace Component/ContactForm/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ContactFormContainerMapDispatchProps => ({
    sendMessage: (data) => ContactFormDispatcher.then(
        ({ default: dispatcher }) => dispatcher.prepareRequest(data, dispatch)
    )
});

/** @namespace Component/ContactForm/Container */
export class ContactFormContainer extends PureComponent<ContactFormContainerProps> {
    containerFunctions = {
        onFormSubmit: this.onFormSubmit.bind(this)
    };

    onFormSubmit(form: HTMLFormElement, fields: FormFields): void {
        const { sendMessage } = this.props;
        const filteredFields: Record<string, FieldValue> = {};

        if (Array.isArray(fields)) {
            fields.forEach(({ name, value }) => {
                filteredFields[ name ] = value;
            });
        }

        sendMessage({ form, fields: filteredFields });
    }

    containerProps(): Pick<ContactFormComponentProps, ContactFormComponentContainerPropKeys> {
        const { isLoading } = this.props;

        return { isLoading };
    }

    render(): ReactElement {
        return (
            <ContactForm
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormContainer);
