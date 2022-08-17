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

export interface KeyValueTableComponentProps {
    title?: string;
    isSelected?: boolean;
}

export interface DataPair<T = Record<string, Array<string | number> | string | number>> {
    key: string;
    label: string;
    source: T;
}
