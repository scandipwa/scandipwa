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

import { Dispatch } from 'redux';

import ContactFormQuery from 'Query/ContactForm.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';

import { updateContactForm } from './ContactForm.action';
import { ContactFormDispatcherOptions } from './ContactForm.type';

/**
 * ContactForm Dispatcher
 * @class ContactFormDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ContactForm/Dispatcher
 */
export class ContactFormDispatcher {
    prepareRequest(options: ContactFormDispatcherOptions, dispatch: Dispatch): Promise<void> {
        const { form = {}, fields = {} } = options;

        const mutation = ContactFormQuery.getSendContactFormMutation(fields);

        dispatch(updateContactForm({
            isLoading: true
        }));

        return fetchMutation(mutation)
            .then(
                /** @namespace Store/ContactForm/Dispatcher/ContactFormDispatcher/prepareRequest/fetchMutation/then */
                (data) => {
                    dispatch(showNotification(NotificationType.SUCCESS, data.contactForm.message || ''));
                    dispatch(updateContactForm({
                        isLoading: false
                    }));

                    // Clears form
                    if (typeof form.reset === 'function') {
                        form.reset();
                    }
                },
                /** @namespace Store/ContactForm/Dispatcher/ContactFormDispatcher/prepareRequest/fetchMutation/then/catch */
                (error) => {
                    dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
                    dispatch(updateContactForm({
                        isLoading: false
                    }));
                }
            );
    }
}

export default new ContactFormDispatcher();
