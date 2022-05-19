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

import { ContactFormDispatcherOptions } from 'Store/ContactForm/ContactForm.type';
import { FieldData } from 'Util/Form/Form.type';

export interface ContactFormContainerMapStateProps {
    isLoading: boolean;
}

export interface ContactFormContainerMapDispatchProps {
    sendMessage: (data: ContactFormDispatcherOptions) => void;
}

export type ContactFormContainerProps = ContactFormContainerMapStateProps
& ContactFormContainerMapDispatchProps;

export interface ContactFormComponentProps {
    isLoading: boolean;
    onFormSubmit: (form: HTMLFormElement, fields: FieldData[]) => void;
}
