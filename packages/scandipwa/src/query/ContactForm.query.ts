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

import { Mutation, Query } from '@tilework/opus';

import { GQLContactForm, GQLContactFormResponse, GQLContactPageConfig } from 'Type/Graphql.type';

/** @namespace Query/ContactForm/Query */
export class ContactFormQuery {
    getSendContactFormMutation(options: GQLContactForm): Mutation<'contactForm', GQLContactFormResponse> {
        const mutation = new Mutation<'contactForm', GQLContactFormResponse>('contactForm');
        this._addSendContactFormMutationArguments(mutation as Mutation<string, unknown>, options);
        mutation.addFieldList(this._getSendContactFormMutationResponse());

        return mutation;
    }

    getContactPageConfigQuery(): Query<'contactPageConfig', GQLContactPageConfig> {
        return new Query<'contactPageConfig', GQLContactPageConfig>('contactPageConfig')
            .addFieldList(this._getContactPageConfigFields());
    }

    _addSendContactFormMutationArguments(
        mutation: Mutation<string, unknown>,
        options: GQLContactForm
    ): Mutation<string, unknown> {
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
