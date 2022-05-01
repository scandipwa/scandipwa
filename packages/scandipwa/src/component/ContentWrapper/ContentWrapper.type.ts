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

import { Children, Mix } from 'Type/Common.type';
import { Label } from 'Type/Field.type';

export interface ContentWrapperComponentProps {
    children?: Children;
    mix?: Mix;
    wrapperMix?: {
        block?: string;
        elem?: string;
    };
    label: Label;
    isNotSection?: boolean;
}
