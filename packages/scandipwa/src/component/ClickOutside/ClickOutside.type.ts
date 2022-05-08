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

import { MouseEvent } from 'react';

import { ReactElement } from 'Type/Common.type';

export interface ClickOutsideComponentProps {
    onClick: (e: MouseEvent) => void;
    children: ReactElement | ReactElement[];
}
