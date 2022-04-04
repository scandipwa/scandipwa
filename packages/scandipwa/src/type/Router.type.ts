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

import { RouteComponentProps } from 'react-router-dom';

// TODO

export type History = RouteComponentProps['history'] & {}

export type Location = RouteComponentProps['location'] & {}

export type Match = RouteComponentProps['match'] & {}

export type UrlRewrite = {
    id?: number;
    type?: string;
    sku?: string;
    notFound?: boolean;
}

export type Link = [string | unknown]
