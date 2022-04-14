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

import { MouseEvent } from 'react';

import { Children, Mix } from 'Type/Common.type';

export interface LinkComponentProps {
    to: string;
    className: string;
    bemProps: Mix;
    children: Children;
    onClick: (e: MouseEvent) => void;
    isOpenInNewTab: boolean;
}
