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

import { Field } from 'Util/Query';

/** @namespace Query/ContactForm */
export class ContactFormQuery {
    getSendContactFormMutation(options) {
        return new Field('contactForm')
            .addArgument('contact', 'ContactForm!', options)
            .addField('message');
    }

    getContactPageConfigQuery() {
        return new Field('contactPageConfig')
            .addField('enabled');
    }
}

export default new ContactFormQuery();
