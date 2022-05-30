/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { FormFields } from 'Component/Form/Form.type';
import { ContactFormDispatcherOptions } from 'Store/ContactForm/ContactForm.type';

export interface ContactFormContainerMapStateProps {
    isLoading: boolean;
}

export interface ContactFormContainerMapDispatchProps {
    sendMessage: (data: ContactFormDispatcherOptions) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContactFormContainerBaseProps {}

export type ContactFormContainerProps = ContactFormContainerMapStateProps
& ContactFormContainerMapDispatchProps
& ContactFormContainerBaseProps;

export interface ContactFormComponentProps {
    isLoading: boolean;
    onFormSubmit: (form: HTMLFormElement, fields: FormFields) => void;
}

export type ContactFormComponentContainerPropKeys = 'isLoading';
