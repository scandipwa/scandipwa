/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import {
    Field,
    InlineFragment,
    Mutation,
    Query,
} from '@tilework/opus';

import { ProductListQuery } from 'Query/ProductList.query';

import {
    AssignCompareListToCustomerOutput,
    ComparableAttribute,
    ComparableItem,
    ComparableItemAttribute,
    ComparableProduct,
    CompareList,
    ProductId,
} from './ProductCompare.type';
import { CustomizableProductFragmentOptions } from './ProductList.type';

/** @namespace Query/ProductCompare/Query */
export class ProductCompareQuery extends ProductListQuery {
    getCreateEmptyCompareList(): Mutation<'createCompareList', CompareList> {
        return new Mutation<'createCompareList', CompareList>('createCompareList')
            .addArgument('input', 'CreateCompareListInput', {})
            .addFieldList(this._getCompareListFields());
    }

    getCreateCompareList(products: string[]): Mutation<'createCompareList', CompareList> {
        return new Mutation<'createCompareList', CompareList>('createCompareList')
            .addArgument('input', 'CreateCompareListInput', { products })
            .addFieldList(this._getCompareListFields());
    }

    getDeleteCompareList(uid: string): Mutation<'deleteCompareList', { result: boolean }> {
        return new Mutation<'deleteCompareList', { result: boolean }>('deleteCompareList')
            .addArgument('uid', 'ID!', uid)
            .addField('result');
    }

    getAddProductsToCompareList(
        uid: string,
        products: string[],
    ): Mutation<'addProductsToCompareList', CompareList> {
        return new Mutation<'addProductsToCompareList', CompareList>('addProductsToCompareList')
            .addArgument('input', 'AddProductsToCompareListInput', { uid, products })
            .addFieldList(this._getCompareListFields());
    }

    getRemoveProductsFromCompareList(
        uid: string,
        products: string[],
    ): Mutation<'removeProductsFromCompareList', CompareList> {
        return new Mutation<'removeProductsFromCompareList', CompareList>('removeProductsFromCompareList')
            .addArgument('input', 'RemoveProductsFromCompareListInput', { uid, products })
            .addFieldList(this._getCompareListFields());
    }

    getAssignCompareList(uid: string): Mutation<'assignCompareListToCustomer', AssignCompareListToCustomerOutput> {
        return new Mutation<'assignCompareListToCustomer', AssignCompareListToCustomerOutput>(
            'assignCompareListToCustomer',
        )
            .addArgument('uid', 'ID!', uid)
            .addFieldList(this._getAssignFields());
    }

    _getAssignFields(): Array<
    Field<'result', boolean>
    | Field<'compare_list', CompareList>
    > {
        return [
            new Field<'result', boolean>('result'),
            this._getAssignCompareListField(),
        ];
    }

    _getAssignCompareListField(): Field<'compare_list', CompareList> {
        return new Field<'compare_list', CompareList>('compare_list')
            .addFieldList(this._getCompareListFields());
    }

    getCompareList(uid: string): Query<'compareList', CompareList> {
        return new Query<'compareList', CompareList>('compareList')
            .addArgument('uid', 'ID!', uid)
            .addFieldList(this._getCompareListFields());
    }

    getCompareListIds(uid: string): Query<'compareList', { items: ProductId[] }> {
        return new Query<'compareList', { items: ProductId[] }>('compareList')
            .addArgument('uid', 'ID!', uid)
            .addField(this._getComparableItemIdsField());
    }

    _getCompareListFields(): Array<
    Field<'uid', string>
    | Field<'item_count', number>
    | Field<'attributes', ComparableAttribute, true>
    | Field<'items', ComparableItem, true>
    > {
        return [
            new Field<'uid', string>('uid'),
            new Field<'item_count', number>('item_count'),
            this._getCompareAttributeField(),
            this._getComparableItemField(),
        ];
    }

    _getCompareAttributeField(): Field<'attributes', ComparableAttribute, true> {
        return new Field<'attributes', ComparableAttribute, true>('attributes', true)
            .addFieldList(this._getCompareAttributeFields());
    }

    _getCompareAttributeFields(): Array<
    Field<'label', string>
    | Field<'code', string>
    > {
        return [
            new Field<'label', string>('label'),
            new Field<'code', string>('code'),
        ];
    }

    _getComparableItemAttributeField(): Field<'attributes', ComparableItemAttribute, true> {
        return new Field<'attributes', ComparableItemAttribute, true>('attributes', true)
            .addFieldList(this._getComparableItemAttributeFields());
    }

    _getComparableItemAttributeFields(): Array<
    Field<'value', string>
    | Field<'code', string>
    > {
        return [
            new Field<'value', string>('value'),
            new Field<'code', string>('code'),
        ];
    }

    _getComparableItemFields(): Array<
    Field<'product', ComparableProduct>
    | Field<'attributes', ComparableItemAttribute, true>
    > {
        return [
            this._getCompareProductField(),
            this._getComparableItemAttributeField(),
        ];
    }

    _getComparableItemIdsFields(): Field<'product', { id: number }>[] {
        return [
            this._getProductIdsField(),
        ];
    }

    _getCompareProductField(): Field<'product', ComparableProduct> {
        return new Field<'product', ComparableProduct>('product')
            .addFieldList(this._getProductInterfaceFields(true, false))
            .addFieldList([new Field<'url', string>('url')])
            .addField(this._getReviewCountField())
            .addField(this._getRatingSummaryField())
            .addField(this._getDescriptionField())
            .addField(this._getGroupedProductItems())
            .addField(this._getDownloadableProductLinksRequired())
            .addField(this._getCustomizableProductFragment());
    }

    _getCustomizableProductFragment(): InlineFragment<'CustomizableProductInterface', {
        options: CustomizableProductFragmentOptions[];
    }> {
        return new InlineFragment<'CustomizableProductInterface', {
            options: CustomizableProductFragmentOptions[];
        }>(
            'CustomizableProductInterface',
        )
            .addFieldList([this._getCustomizableProductRequiredOptionsField()]);
    }

    _getCustomizableProductRequiredOptionsField(): Field<'options', CustomizableProductFragmentOptions, true> {
        return new Field<'options', CustomizableProductFragmentOptions, true>('options', true)
            .addField(new Field<'required', boolean>('required'));
    }

    _getProductIdsField(): Field<'product', { id: number }> {
        return new Field<'product', { id: number }>('product')
            .addFieldList(this._getProductIdsFields());
    }

    _getComparableItemField(): Field<'items', ComparableItem, true> {
        return new Field<'items', ComparableItem, true>('items', true)
            .addFieldList(this._getComparableItemFields());
    }

    _getComparableItemIdsField(): Field<'items', ProductId, true> {
        return new Field<'items', { product: { id: number } }, true>('items')
            .addFieldList(this._getComparableItemIdsFields());
    }

    _getProductIdsFields(): Field<'id', number>[] {
        return [
            new Field<'id', number>('id'),
        ];
    }
}

export default new ProductCompareQuery();
