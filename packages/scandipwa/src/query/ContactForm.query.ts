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

import { GQLContactForm } from 'Type/Graphql.type';
import { Field } from 'Util/Query';

/** @namespace Query/ContactForm/Query */
export class ContactFormQuery {
    getSendContactFormMutation(options: GQLContactForm): Field {
        const mutation = new Field('contactForm');
        this._addSendContactFormMutationArguments(mutation, options);
        mutation.addFieldList(this._getSendContactFormMutationResponse());

        return mutation;
    }

    getContactPageConfigQuery(): Field {
        return new Field('contactPageConfig')
            .addFieldList(this._getContactPageConfigFields());
    }

    _addSendContactFormMutationArguments(mutation: Field, options: GQLContactForm): Field {
        return mutation.addArgument('contact', 'ContactForm!', options);
    }

    _getSendContactFormMutationResponse(): string[] {
        return ['message'];
    }

    _getContactPageConfigFields(): string[] {
        return ['enabled'];
    }
}

export default new ContactFormQuery();
