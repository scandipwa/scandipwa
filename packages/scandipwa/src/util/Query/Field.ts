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

import { FieldArgument } from './Query.type';

/**
 * Builds GraphQL query according to https://graphql.org/learn/queries/ documentation
 * @class Query
 * @extends Field
 * @namespace Util/Query/Field
 */
export class Field {
    name = '';

    alias = '';

    children: Field[] = [];

    args: FieldArgument[] = [];

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-magic-construct
    constructor(name: string) {
        this.__construct(name);
    }

    __construct(name: string): void {
        this.name = name;
    }

    addField(field: string | Field): this {
        if (typeof field === 'string') {
            this.children.push(new Field(field));
        } else if (field instanceof Field) {
            this.children.push(field);
        }

        return this;
    }

    setAlias(alias: string): this {
        this.alias = `${alias}:`;

        return this;
    }

    addFieldList(fieldList: Array<string | Field>): this {
        fieldList.forEach(this.addField.bind(this));

        return this;
    }

    addArgument<T>(name: string, type: string, value: T): this {
        this.args.push({
            name,
            type,
            value
        });

        return this;
    }
}

export default Field;
