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

import ContactFormQuery from 'Query/ContactForm.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { fetchMutation, getErrorMessage } from 'Util/Request';

import { updateContactForm } from './ContactForm.action';

/**
 * ContactForm Dispatcher
 * @class ContactFormDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ContactForm/Dispatcher
 */
export class ContactFormDispatcher {
    prepareRequest(options, dispatch) {
        const mutation = ContactFormQuery.getSendContactFormMutation(options);

        dispatch(updateContactForm({
            isLoading: true
        }));

        return fetchMutation(mutation)
            .then(
                /** @namespace Store/ContactForm/Dispatcher/fetchMutationThen */
                (data) => {
                    dispatch(showNotification('success', data.contactForm.message));
                    dispatch(updateContactForm({
                        isLoading: false
                    }));
                },
                /** @namespace Store/ContactForm/Dispatcher/fetchMutationError */
                (error) => {
                    dispatch(showNotification('error', getErrorMessage(error)));
                    dispatch(updateContactForm({
                        isLoading: false
                    }));
                }
            );
    }
}

export default new ContactFormDispatcher();
