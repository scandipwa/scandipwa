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

import { Field, Mutation, Query } from '@tilework/opus';

import { GQLContactForm } from 'Type/Graphql.type';

/** @namespace Query/ContactForm/Query */
export class ContactFormQuery {
    getSendContactFormMutation(options: GQLContactForm): Mutation<'contactForm', { message: string }> {
        const mutation = new Mutation<'contactForm', { message: string }>('contactForm');
        this._addSendContactFormMutationArguments(mutation, options);
        mutation.addFieldList(this._getSendContactFormMutationResponse());

        return mutation;
    }

    getContactPageConfigQuery(): Query<'contactPageConfig', { enabled: boolean }> {
        return new Query<'contactPageConfig', { enabled: boolean }>('contactPageConfig')
            .addFieldList(this._getContactPageConfigFields());
    }

    _addSendContactFormMutationArguments(
        mutation: Mutation<'contactForm', { message: string }>,
        options: GQLContactForm
    ): Mutation<'contactForm', { message: string }> {
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
