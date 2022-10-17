/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export interface Store {
    city: string;
    country: string;
    description: string;
    name: string;
    phone: string;
    pickup_location_code: string;
    postcode: string;
    region: string;
    street: string[];
    extension_attributes?: {
        attribute_code: string;
        value: string;
    }[];
}
