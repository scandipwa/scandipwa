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

export enum FieldType {
    MUTATION = 'mutation',
    QUERY = 'query',
}

export interface FieldArgument {
    name: string;
    type: string;
    value: unknown;
}

export interface PreparedRequest {
    query: string;
    variables: unknown;
}
