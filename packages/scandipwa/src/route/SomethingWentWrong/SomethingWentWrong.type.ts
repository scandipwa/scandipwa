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

import { ErrorInfo } from 'react';

import { MetaStore } from 'Store/Meta/Meta.type';

export interface SomethingWentWrongContainerMapDispatchProps {
    updateMetaStore: (state: Partial<MetaStore>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SomethingWentWrongContainerMapStateToProps {}

export interface SomethingWentWrongContainerBaseProps {
    onClick: () => void;
    errorDetails: {
        err: Error;
        info: ErrorInfo;
    } | EmptyObject;

}

export type SomethingWentWrongContainerProps = SomethingWentWrongContainerMapDispatchProps
& SomethingWentWrongContainerBaseProps;

export interface SomethingWentWrongComponentProps {
    onClick: () => void;
    errorDetails: {
        err: Error;
        info: ErrorInfo;
    } | EmptyObject;

}

export type SomethingWentWrongContainerPropsKeys =
'onClick'
| 'errorDetails';
