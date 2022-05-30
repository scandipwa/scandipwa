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

import { ProductOption } from 'Component/Product/Product.type';

import { FieldDateType } from './FieldDate.config';

export interface FieldDateContainerMapStateProps {
    useCalendar: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FieldDateContainerMapDispatchProps {}

export interface FieldDateContainerBaseProps {
    type: FieldDateType;
    uid: string;
    isRequired: boolean;
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}

export type FieldDateContainerProps = FieldDateContainerMapStateProps
& FieldDateContainerMapDispatchProps
& FieldDateContainerBaseProps;

export interface FieldDateComponentProps {
    type: FieldDateType;
    uid: string;
    isRequired: boolean;
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}
