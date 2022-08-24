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

import { Children } from 'Type/Common.type';

export interface PaginationLinkComponentProps {
    children: Children;
    label: string;
    isCurrent: boolean;
    url_path: string;
    pageNumber: number;
    getSearchQueryForPage: (pageNumber: number) => string;
}
