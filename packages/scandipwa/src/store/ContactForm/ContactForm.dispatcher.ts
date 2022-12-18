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
import { NotificationType } from 'Store/Notification/Notification.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { updateContactStore } from './ContactForm.action';
import { ContactFormDispatcherOptions } from './ContactForm.type';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

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

        this.dispatch(updateContactStore({
            isLoading: true,
        }));

        return fetchMutation(mutation)
            .then(
                /** @namespace Store/ContactForm/Dispatcher/ContactFormDispatcher/prepareRequest/fetchMutation/then */
                (data) => {
                    NotificationDispatcher.then(
                        ({ default: dispatcher }) => dispatcher.showNotification(
                            NotificationType.SUCCESS,
                            data.contactForm.message || '',
                        ),
                    );
                    this.dispatch(updateContactStore({
                        isLoading: false,
                    }));

                    // Clears form
                    if (typeof form.reset === 'function') {
                        form.reset();
                    }
                },
                /** @namespace Store/ContactForm/Dispatcher/ContactFormDispatcher/prepareRequest/fetchMutation/then/catch */
                (error) => {
                    NotificationDispatcher.then(
                        ({ default: dispatcher }) => dispatcher.showNotification(
                            NotificationType.ERROR,
                            getErrorMessage(error),
                        ),
                    );
                    this.dispatch(updateContactStore({
                        isLoading: false,
                    }));
                },
            );
    }
}

export default new ContactFormDispatcher();
