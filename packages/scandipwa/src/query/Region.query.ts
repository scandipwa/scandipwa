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

import { GQLCountry, GQLRegion } from 'Type/Graphql.type';

import { CommonField } from './Query.type';

/**
 * RegionQuery Mutations
 * @class RegionQuery
 * @namespace Query/Region/Query */
export class RegionQuery {
    getCountriesQuery(): Query<'countries', GQLCountry, true> {
        return new Query<'countries', GQLCountry, true>('countries', true)
            .addFieldList(this._getCountryFields());
    }

    _getCountryFields(): CommonField[] {
        return [
            'id',
            'is_state_required',
            this._getAvailableRegionsField(),
            new Field<'full_name_locale', string>('full_name_locale').setAlias('label')
        ];
    }

    _getAvailableRegionFields(): string[] {
        return [
            'code',
            'name',
            'id'
        ];
    }

    _getAvailableRegionsField(): Field<'available_regions', GQLRegion, true> {
        return new Field<'available_regions', GQLRegion, true>('available_regions', true)
            .addFieldList(this._getAvailableRegionFields());
    }
}

export default new RegionQuery();
