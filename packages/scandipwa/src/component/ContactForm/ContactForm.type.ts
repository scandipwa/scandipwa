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

import { ContactFormDispatcherOptions } from 'Store/ContactForm/ContactForm.type';
import { FieldData } from 'Util/Form/Form.type';

export interface ContactFormContainerMapStateProps {
    isLoading: boolean;
}

export interface ContactFormContainerMapDispatchProps {
    sendMessage: (data: ContactFormDispatcherOptions) => void;
}

export interface ContactFormContainerFunctions {
    onFormSubmit: (form: HTMLFormElement, fields: FieldData[]) => void;
}

export interface ContactFormContainerBaseProps {}

export type ContactFormContainerProps = ContactFormContainerMapStateProps
& ContactFormContainerMapDispatchProps
& ContactFormContainerBaseProps;

export interface ContactFormComponentProps {
    isLoading: boolean;
    onFormSubmit: (form: HTMLFormElement, fields: FieldData[]) => void;
}

export type ContactFormComponentContainerPropKeys = 'isLoading';

export interface ContactFormComponentState {}

export interface ContactFormContainerState {}
