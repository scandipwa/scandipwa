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

import { FieldContainerProps } from 'Component/Field/Field.type';
import { FieldGroupEvents } from 'Component/FieldGroup/FieldGroup.type';

export interface FormSection {
    name: string;
    fields: Partial<FieldContainerProps>[];
    attr?: { name?: string };
    mods?: Record<string, boolean>;
    events?: FieldGroupEvents;
}

export interface FieldFormComponentState {}

export interface FieldFormComponentProps {}
