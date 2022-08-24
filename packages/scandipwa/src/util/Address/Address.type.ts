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

import { Country } from 'Query/Region.type';

export interface ZippopotamResponseResult {
    city: string;
    region: string;
    regionAbbr: string;
}

export interface FormattedRegion {
    country?: string;
    region?: string | null;
}

export interface CountryOption extends Country {
    name: string;
    value: string;
}
