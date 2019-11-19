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

import { Field } from 'Util/Query';
import { CompareProduct } from 'Query';
import { isSignedIn } from 'Util/Auth';

class Compare {
    getCompareProductsQuery(quoteId) {
        const query = new Field('CompareProducts');

        if (!isSignedIn()) query.addArgument('guestCartId', 'String', quoteId);

        this._getCompareItemField(query, true);

        return query;
    }

    getAddProductToCompareQuery(sku, quoteId) {
        const query = new Field('addProductToCompare')
            .addField('entity_id')
            .addField('store_id')
            .addField('sku')
            .addField('name');

        query.addArgument('product_sku', 'String!', sku);
        if (!isSignedIn()) query.addArgument('guestCartId', 'String', quoteId);

        return query;
    }

    getRemoveCompareProductMutation(sku, quoteId) {
        const mutation = new Field('removeCompareProduct');

        mutation.addArgument('product_sku', 'String!', sku);
        if (!isSignedIn()) mutation.addArgument('guestCartId', 'String', quoteId);

        return mutation;
    }

    getClearCompareProductsMutation(quoteId) {
        const mutation = new Field('clearCompareProducts');

        if (!isSignedIn()) mutation.addArgument('guestCartId', 'String', quoteId);

        return mutation;
    }

    _getCompareItemField(field) {
        field.addField(CompareProduct._prepareItemsField(
            new Field('products')
        ));
    }
}

export { Compare };

export default new Compare();
