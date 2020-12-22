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

/**
 * Builds GraphQL query according to https://graphql.org/learn/queries/ documentation
 * @class Query
 * @extends Field
 * @namespace Util/Query/Field
 */
export class Field {
    alias = '';

    children = [];

    args = [];

    __construct(name) {
        this.name = name;
    }

    addField = (field) => {
        if (typeof field === 'string') {
            this.children.push(new Field(field));
        } else if (field instanceof Field) {
            this.children.push(field);
        }

        return this;
    };

    setAlias(alias) {
        this.alias = `${alias}:`;

        return this;
    }

    addFieldList(fieldList) {
        fieldList.forEach(this.addField);

        return this;
    }

    addArgument(name, type, value) {
        this.args.push({
            name,
            type,
            value
        });

        return this;
    }
}

export default Field;
