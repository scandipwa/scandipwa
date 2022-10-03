/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Field, Query } from '@tilework/opus';

import { GQLProductInfoInput } from 'Type/Graphql.type';

import { Store } from './StoreInPickUp.type';

/** @namespace Query/StoreInPickUp/Query */
export class StoreInPickUpQuery {
    getStores(
        country: string,
        search = '',
        productsInfo?: GQLProductInfoInput[],
    ): Query<'getStores', { stores: Store[] }> {
        return new Query<'getStores', { stores: Store[] }>('getStores')
            .addFieldList([this.getStoreFields()])
            .addArgument('search', 'String', search)
            .addArgument('country', 'String', country)
            .addArgument('productsInfo', '[ProductInfoInput]', productsInfo);
    }

    getStoreFields(): Field<'stores', Store, true> {
        return new Field<'stores', Store, true>('stores', true)
            .addFieldList([
                new Field<'city', string>('city'),
                new Field<'country', string>('country'),
                new Field<'description', string>('description'),
                new Field<'name', string>('name'),
                new Field<'phone', string>('phone'),
                new Field<'pickup_location_code', string>('pickup_location_code'),
                new Field<'postcode', string>('postcode'),
                new Field<'region', string>('region'),
                new Field<'street', string>('street'),
            ]);
    }
}

export default new StoreInPickUpQuery();
