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
import React from 'react';

import injectReducers from 'Util/DynamicReducer/Helper';
import getStore from 'Util/Store';

export const withReducers = (reducers) => (WrappedComponent) => {
    const injectAndExecute = (props) => {
        injectReducers(getStore(), reducers);

        return <WrappedComponent { ...props } />;
    };

    return injectAndExecute;
};

export default { withReducers };
