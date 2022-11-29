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

import {
    FieldAttributes, FieldEvents,
} from 'Component/Field/Field.type';
import { Children, Mix } from 'Type/Common.type';

export interface ButtonContainerProps {
    children: Children;
    mix: Mix;
    attr: FieldAttributes;
    events: FieldEvents;
}

export type ButtonContainerPropsKey = 'mix';
