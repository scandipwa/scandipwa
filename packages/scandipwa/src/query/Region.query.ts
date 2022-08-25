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

import { Country, Region } from './Region.type';

/**
 * RegionQuery Mutations
 * @class RegionQuery
 * @namespace Query/Region/Query */
export class RegionQuery {
    getCountriesQuery(): Query<'countries', Country, true> {
        return new Query<'countries', Country, true>('countries', true)
            .addFieldList(this._getCountryFields());
    }

    _getCountryFields(): Array<
    Field<'id', number>
    | Field<'is_state_required', boolean>
    | Field<'available_regions', Region, true>
    | Field<'label', string>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'is_state_required', boolean>('is_state_required'),
            this._getAvailableRegionsField(),
            new Field<'full_name_locale', string>('full_name_locale').setAlias('label')
        ];
    }

    _getAvailableRegionFields(): Array<
    Field<'code', string>
    | Field<'name', string>
    | Field<'id', number>
    > {
        return [
            new Field<'code', string>('code'),
            new Field<'name', string>('name'),
            new Field<'id', number>('id')
        ];
    }

    _getAvailableRegionsField(): Field<'available_regions', Region, true> {
        return new Field<'available_regions', Region, true>('available_regions', true)
            .addFieldList(this._getAvailableRegionFields());
    }
}

export default new RegionQuery();
