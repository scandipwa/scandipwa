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

import { ProductListQuery } from 'Query/ProductList.query';
import { Field } from 'Util/Query';

/** @namespace Query/ProductCompare/Query */
export class ProductCompareQuery extends ProductListQuery {
    getCreateEmptyCompareList(): Field {
        return new Field('createCompareList')
            .addArgument('input', 'CreateCompareListInput', {})
            .addFieldList(this._getCompareListFields());
    }

    getCreateCompareList(products: string[]): Field {
        return new Field('createCompareList')
            .addArgument('input', 'CreateCompareListInput', { products })
            .addFieldList(this._getCompareListFields());
    }

    getDeleteCompareList(uid: string): Field {
        return new Field('deleteCompareList')
            .addArgument('uid', 'ID!', uid)
            .addField('result');
    }

    getAddProductsToCompareList(uid: string, products: string[]): Field {
        return new Field('addProductsToCompareList')
            .addArgument('input', 'AddProductsToCompareListInput', { uid, products })
            .addFieldList(this._getCompareListFields());
    }

    getRemoveProductsFromCompareList(uid: string, products: string[]): Field {
        return new Field('removeProductsFromCompareList')
            .addArgument('input', 'RemoveProductsFromCompareListInput', { uid, products })
            .addFieldList(this._getCompareListFields());
    }

    getAssignCompareList(uid: string): Field {
        return new Field('assignCompareListToCustomer')
            .addArgument('uid', 'ID!', uid)
            .addFieldList(this._getAssignFields());
    }

    _getAssignFields(): Array<string | Field> {
        return [
            'result',
            this._getAssignCompareListField()
        ];
    }

    _getAssignCompareListField(): Field {
        return new Field('compare_list')
            .addFieldList(this._getCompareListFields());
    }

    getCompareList(uid: string): Field {
        return new Field('compareList')
            .addArgument('uid', 'ID!', uid)
            .addFieldList(this._getCompareListFields());
    }

    getCompareListIds(uid: string): Field {
        return new Field('compareList')
            .addArgument('uid', 'ID!', uid)
            .addField(this._getComparableItemIdsField());
    }

    _getCompareListFields(): Array<string | Field> {
        return [
            'uid',
            'item_count',
            // 'review_count',
            // 'rating_summary',
            this._getCompareAttributeField(),
            this._getComparableItemField()
        ];
    }

    _getCompareAttributeField(): Field {
        return new Field('attributes')
            .addFieldList(this._getCompareAttributeFields());
    }

    _getCompareAttributeFields(): string[] {
        return [
            'label',
            'code'
        ];
    }

    _getComparableItemAttributeField(): Field {
        return new Field('attributes')
            .addFieldList(this._getComparableItemAttributeFields());
    }

    _getComparableItemAttributeFields(): string[] {
        return [
            'value',
            'code'
        ];
    }

    _getComparableItemFields(): Field[] {
        return [
            this._getCompareProductField(),
            this._getComparableItemAttributeField()
        ];
    }

    _getComparableItemIdsFields(): Field[] {
        return [
            this._getProductIdsField()
        ];
    }

    _getCompareProductField(): Field {
        return new Field('product')
            .addFieldList(this._getProductInterfaceFields(true, false))
            .addFieldList(['url'])
            .addField(this._getReviewCountField())
            .addField(this._getRatingSummaryField())
            .addField(this._getDescriptionField())
            .addField(this._getGroupedProductItems());
    }

    _getProductIdsField(): Field {
        return new Field('product')
            .addFieldList(this._getProductIdsFields());
    }

    _getComparableItemField(): Field {
        return new Field('items')
            .addFieldList(this._getComparableItemFields());
    }

    _getComparableItemIdsField(): Field {
        return new Field('items')
            .addFieldList(this._getComparableItemIdsFields());
    }

    _getProductIdsFields(): string[] {
        return [
            'id'
        ];
    }
}

export default new ProductCompareQuery();
