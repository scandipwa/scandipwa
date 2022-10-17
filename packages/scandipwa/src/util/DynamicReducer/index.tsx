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

import { ElementType } from 'react';
import { Reducer } from 'redux';

import injectReducers from 'Util/DynamicReducer/Helper';
import { getStore } from 'Util/Store';

import { Props, WithReducersResult } from './DynamicReducer.type';

/** @namespace Util/DynamicReducer/Index/withReducers */
export const withReducers = (reducers: Record<string, Reducer>) => (
    WrappedComponent: ElementType,
): WithReducersResult => {
    const injectAndExecute = (props: Props) => {
        injectReducers(getStore(), reducers);

        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
        return <WrappedComponent { ...props } />;
    };

    return injectAndExecute;
};

export default { withReducers };
