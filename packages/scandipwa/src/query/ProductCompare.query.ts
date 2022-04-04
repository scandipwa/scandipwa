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

import { Field, Mutation } from '@tilework/opus';

import { ProductListQuery } from 'Query/ProductList.query';
import {
    GQLAssignCompareListToCustomerOutput,
    GQLComparableAttribute,
    GQLComparableItem,
    GQLCompareList,
    GQLDeleteCompareListOutput,
    GQLGroupedProduct,
    GQLProductAttribute,
    GQLProductInterface
} from 'Type/Graphql.type';

import { CommonField } from './Query.type';

/** @namespace Query/ProductCompare/Query */
export class ProductCompareQuery extends ProductListQuery {
    getCreateEmptyCompareList(): Mutation<'createCompareList', GQLCompareList> {
        return new Mutation<'createCompareList', GQLCompareList>('createCompareList')
            .addArgument('input', 'CreateCompareListInput', {})
            .addFieldList(this._getCompareListFields());
    }

    getCreateCompareList(products: string[]): Mutation<'createCompareList', GQLCompareList> {
        return new Mutation<'createCompareList', GQLCompareList>('createCompareList')
            .addArgument('input', 'CreateCompareListInput', { products })
            .addFieldList(this._getCompareListFields());
    }

    getDeleteCompareList(uid: string): Mutation<'deleteCompareList', GQLDeleteCompareListOutput> {
        return new Mutation<'deleteCompareList', GQLDeleteCompareListOutput>('deleteCompareList')
            .addArgument('uid', 'ID!', uid)
            .addField('result');
    }

    getAddProductsToCompareList(uid: string, products: string[]): Mutation<'addProductsToCompareList', GQLCompareList> {
        return new Mutation<'addProductsToCompareList', GQLCompareList>('addProductsToCompareList')
            .addArgument('input', 'AddProductsToCompareListInput', { uid, products })
            .addFieldList(this._getCompareListFields());
    }

    getRemoveProductsFromCompareList(
        uid: string,
        products: string[]
    ): Mutation<'removeProductsFromCompareList', GQLCompareList> {
        return new Mutation<'removeProductsFromCompareList', GQLCompareList>('removeProductsFromCompareList')
            .addArgument('input', 'RemoveProductsFromCompareListInput', { uid, products })
            .addFieldList(this._getCompareListFields());
    }

    getAssignCompareList(uid: string): Mutation<'assignCompareListToCustomer', GQLAssignCompareListToCustomerOutput> {
        return new Mutation<'assignCompareListToCustomer', GQLAssignCompareListToCustomerOutput>(
            'assignCompareListToCustomer'
        )
            .addArgument('uid', 'ID!', uid)
            .addFieldList(this._getAssignFields());
    }

    _getAssignFields(): CommonField[] {
        return [
            'result',
            this._getAssignCompareListField()
        ];
    }

    _getAssignCompareListField(): Field<'compare_list', GQLCompareList> {
        return new Field<'compare_list', GQLCompareList>('compare_list')
            .addFieldList(this._getCompareListFields());
    }

    getCompareList(uid: string): Field<'compareList', GQLCompareList> {
        return new Field<'compareList', GQLCompareList>('compareList')
            .addArgument('uid', 'ID!', uid)
            .addFieldList(this._getCompareListFields());
    }

    getCompareListIds(uid: string): Field<'compareList', GQLCompareList & { items: GQLComparableItem[] }> {
        return new Field<'compareList', GQLCompareList>('compareList')
            .addArgument('uid', 'ID!', uid)
            .addField(this._getComparableItemIdsField());
    }

    _getCompareListFields(): CommonField[] {
        return [
            'uid',
            'item_count',
            // 'review_count',
            // 'rating_summary',
            this._getCompareAttributeField(),
            this._getComparableItemField()
        ];
    }

    _getCompareAttributeField(): Field<'attributes', GQLComparableAttribute, true> {
        return new Field<'attributes', GQLComparableAttribute, true>('attributes', true)
            .addFieldList(this._getCompareAttributeFields());
    }

    _getCompareAttributeFields(): string[] {
        return [
            'label',
            'code'
        ];
    }

    _getComparableItemAttributeField(): Field<'attributes', GQLProductAttribute, true> {
        return new Field<'attributes', GQLProductAttribute, true>('attributes', true)
            .addFieldList(this._getComparableItemAttributeFields());
    }

    _getComparableItemAttributeFields(): string[] {
        return [
            'value',
            'code'
        ];
    }

    _getComparableItemFields(): CommonField[] {
        return [
            this._getCompareProductField(),
            this._getComparableItemAttributeField()
        ];
    }

    _getComparableItemIdsFields(): Field<'product', GQLProductInterface, false>[] {
        return [
            this._getProductIdsField()
        ];
    }

    _getCompareProductField(): Field<
    'product',
    GQLProductInterface & {
        url: string;
    } & {
        review_count: number;
    } & {
        rating_summary: unknown;
    } & {
        description: { [x: string]: string };
    } & Partial<GQLGroupedProduct>> {
        return new Field<'product', GQLProductInterface>('product')
            .addFieldList(this._getProductInterfaceFields(true, false))
            .addFieldList(['url'])
            .addField(this._getReviewCountField())
            .addField(this._getRatingSummaryField())
            .addField(this._getDescriptionField())
            .addField(this._getGroupedProductItems());
    }

    _getProductIdsField(): Field<'product', GQLProductInterface> {
        return new Field<'product', GQLProductInterface>('product')
            .addFieldList(this._getProductIdsFields());
    }

    _getComparableItemField(): Field<'items', GQLComparableItem, true> {
        return new Field<'items', GQLComparableItem, true>('items')
            .addFieldList(this._getComparableItemFields());
    }

    _getComparableItemIdsField(): Field<'items', GQLComparableItem, true> {
        return new Field<'items', GQLComparableItem, true>('items')
            .addFieldList(this._getComparableItemIdsFields());
    }

    _getProductIdsFields(): string[] {
        return [
            'id'
        ];
    }
}

export default new ProductCompareQuery();
