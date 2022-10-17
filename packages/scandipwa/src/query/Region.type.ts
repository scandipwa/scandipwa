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

export interface Region {
    code: string;
    name: string;
    id: number;
}

export interface Country {
    id: string;
    is_state_required: boolean;
    available_regions: Region[];
    label: string;
}
