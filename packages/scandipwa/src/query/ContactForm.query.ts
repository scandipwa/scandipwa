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

import { Field, Mutation, Query } from '@tilework/opus';

import { NetworkError } from 'Type/Common.type';
import { GQLContactForm } from 'Type/Graphql.type';

/** @namespace Query/ContactForm/Query */
export class ContactFormQuery {
    getSendContactFormMutation(options: GQLContactForm): Mutation<'contactForm', NetworkError> {
        const mutation = new Mutation<'contactForm', NetworkError>('contactForm');
        this._addSendContactFormMutationArguments(mutation, options);
        mutation.addFieldList(this._getSendContactFormMutationResponse());

        return mutation;
    }

    getContactPageConfigQuery(): Query<'contactPageConfig', { enabled: boolean }> {
        return new Query<'contactPageConfig', { enabled: boolean }>('contactPageConfig')
            .addFieldList(this._getContactPageConfigFields());
    }

    _addSendContactFormMutationArguments(
        mutation: Mutation<'contactForm', NetworkError>,
        options: GQLContactForm
    ): Mutation<'contactForm', NetworkError> {
        return mutation.addArgument('contact', 'ContactForm!', options);
    }

    _getSendContactFormMutationResponse(): Field<'message', string>[] {
        return [new Field<'message', string>('message')];
    }

    _getContactPageConfigFields(): Field<'enabled', boolean>[] {
        return [new Field<'enabled', boolean>('enabled')];
    }
}

export default new ContactFormQuery();
