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

export class Fragment extends Field {
    /**
     * Creates an instance of Fragment.
     * @param  {String} name Name of the Fragment
     * @memberof Fragment
     */
    constructor(name) {
        super(name);
        this._name = name;
    }

    /**
     * Add fragment syntax to name
     * @private
     * @return {String}
     * @memberof Fragment
     */
    _addFragmentSyntax() {
        return `... on ${this.name}`;
    }

    /**
     * Converts Field to string
     * @return {String}
     * @memberof Field
     */
    toString() {
        const { fieldList } = this;
        if (Object.keys(fieldList).length === 0) {
            return this.name;
        }
        const output = Object.keys(fieldList).map((key) => fieldList[key].toString());
        return `${ this._addFragmentSyntax() } { ${ output.join(', ') } }`;
    }
}

export default Fragment;
