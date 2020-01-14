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

import {fetchMutation, QueryDispatcher} from "Util/Request";
import {ContactFormQuery} from "Query";
import {showNotification} from "Store/Notification";
import {updateContactForm} from './ContactForm.action';

/**
 * ContactForm Dispatcher
 * @class ContactFormDispatcher
 * @extends QueryDispatcher
 */
export class ContactFormDispatcher {

    prepareRequest(options, dispatch) {
        dispatch(updateContactForm({
            isLoading: true,
            success: false,
            error: false,
            formSent : false
        }));

        return fetchMutation(
            ContactFormQuery.getSendContactFormMutation(options)
        ).then(
            data => {
                dispatch(showNotification("success", data.contactForm.message));
                dispatch(updateContactForm({
                    success: true,
                    isLoading: false,
                    formSent : true

                }));
            },
            error => {
                dispatch(showNotification("error", error[0].message));
                dispatch(updateContactForm({
                    error: true,
                    isLoading: false
                }));
            }
        );
    }
}

export default new ContactFormDispatcher();
