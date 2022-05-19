/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { Country } from 'Query/Region.type';

export type ZippopotamResponseResult = {
    city: string;
    region: string;
    regionAbbr: string;
};

export type FormattedRegion = {
    country?: string;
    region?: string | null;
};

export type CountryOption = Country & {
    name: string;
    value: string;
};
