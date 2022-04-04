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

import { Field, Query } from '@tilework/opus';

import { GQLProductInfoInput, GQLStores } from 'Type/Graphql.type';

import { CommonField } from './Query.type';

/** @namespace Query/StoreInPickUp/Query */
export class StoreInPickUpQuery {
    getStores(country: string, search = '', productsInfo?: GQLProductInfoInput): Query<'getStores', GQLStores> {
        return new Query<'getStores', GQLStores>('getStores')
            .addFieldList([this.getStoreFields()])
            .addArgument('search', 'String', search)
            .addArgument('country', 'String', country)
            .addArgument('productsInfo', '[ProductInfoInput]', productsInfo);
    }

    getStoreFields(): CommonField {
        return new Field('stores', true)
            .addFieldList([
                'city',
                'country',
                'description',
                'name',
                'phone',
                'pickup_location_code',
                'postcode',
                'region',
                'street'
            ]);
    }
}

export default new StoreInPickUpQuery();
