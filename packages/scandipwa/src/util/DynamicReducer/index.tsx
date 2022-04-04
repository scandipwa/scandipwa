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

import { ElementType } from 'react';
import { ReducersMapObject } from 'redux';

import injectReducers from 'Util/DynamicReducer/Helper';
import { getStore } from 'Util/Store';

/** @namespace Util/DynamicReducer/Index/withReducers */
export const withReducers = (reducers: ReducersMapObject) => (WrappedComponent: ElementType) => {
    const injectAndExecute = (props: Record<string, unknown>) => {
        injectReducers(getStore(), reducers);

        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
        return <WrappedComponent { ...props } />;
    };

    return injectAndExecute;
};

export default { withReducers };
