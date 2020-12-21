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

import Field from 'Util/Query/Field';

/** @namespace Util/Query/Fragment */
export class Fragment extends Field {
    __construct(name) {
        super.__construct(name);
        this.name = `... on ${name}`;
    }
}

export default Fragment;
