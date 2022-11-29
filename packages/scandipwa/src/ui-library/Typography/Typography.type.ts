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
    FieldAttributes,
} from 'Component/Field/Field.type';
import { Children, Mix } from 'Type/Common.type';

import { TypographyVariants } from './Typography.config';

export interface TypographyContainerProps {
    children: Children;
    mix: Mix;
    attr: FieldAttributes;
    variant: TypographyVariants;
    appearance?: string;
}

export interface TypographyComponentProps extends TypographyContainerProps {}

export type TypographyContainerPropsKey = 'mix' | 'attr' | 'children' | 'variant' | 'appearance';

export interface TypographyMapVariant {
    Component: any;
    block: string;
}
