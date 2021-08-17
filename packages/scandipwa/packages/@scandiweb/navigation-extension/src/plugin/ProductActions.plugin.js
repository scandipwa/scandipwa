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

import './ProductActions.style.plugin.scss';

export const renderMobile = (args, callback, instance) => (
    <>
        <div block="CustomHeader">{ instance.renderName() }</div>
        { callback() }
    </>
);

export default {
    'Component/ProductActions/Component': {
        'member-function': {
            renderMobile
        }
    }
};
