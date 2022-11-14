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

import ContactFormQuery from 'Query/ContactForm.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { updateContactForm } from './ContactForm.action';
import { ContactFormDispatcherOptions } from './ContactForm.type';

/**
 * ContactForm Dispatcher
 * @class ContactFormDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ContactForm/Dispatcher
 */
export class ContactFormDispatcher extends SimpleDispatcher {
    prepareRequest(options: ContactFormDispatcherOptions): Promise<void> {
        const { form = {}, fields = {} } = options;

        const mutation = ContactFormQuery.getSendContactFormMutation(fields);

        this.dispatch(updateContactForm({
            isLoading: true,
        }));

        return fetchMutation(mutation)
            .then(
                /** @namespace Store/ContactForm/Dispatcher/ContactFormDispatcher/prepareRequest/fetchMutation/then */
                (data) => {
                    this.dispatch(showNotification(NotificationType.SUCCESS, data.contactForm.message || ''));
                    this.dispatch(updateContactForm({
                        isLoading: false,
                    }));

                    // Clears form
                    if (typeof form.reset === 'function') {
                        form.reset();
                    }
                },
                /** @namespace Store/ContactForm/Dispatcher/ContactFormDispatcher/prepareRequest/fetchMutation/then/catch */
                (error) => {
                    this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
                    this.dispatch(updateContactForm({
                        isLoading: false,
                    }));
                },
            );
    }
}

export default new ContactFormDispatcher();
