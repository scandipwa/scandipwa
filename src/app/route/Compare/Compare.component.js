/* eslint-disable no-param-reassign */

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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProductCompareCard from 'Component/ProductCompareCard';
import { ItemsType } from 'Type/ProductList';
import TextPlaceholder from 'Component/TextPlaceholder';
import './Compare.style';
import { getAttributeValueByType } from 'Util/AttributeValue/AttributeValue';
import Meta from 'Component/Meta';

export class Compare extends PureComponent {
    componentDidMount() {
        this.updateProducts();
    }

    getAttributeList(products) {
        const isCorrectAttribute = ({
            attribute_type,
            attribute_code,
            attribute_value,
            attribute_options
        }) => {
            if (
                (attribute_code && !attribute_value)
                || (
                    attribute_value
                    && (attribute_options && !Object.keys(attribute_options).length && attribute_type !== 'text')
                )
            ) {
                return null;
            }

            return true;
        };

        const attributeListObject = products.reduce((accumulator, currrent, i) => {
            const { comparableAttributes } = currrent;
            if (!comparableAttributes) return {};
            comparableAttributes.reduce((acc, curr) => {
                const {
                    attribute_code,
                    attribute_label
                } = curr;

                if (!isCorrectAttribute(curr)) {
                    return acc;
                }

                if (!accumulator[attribute_code]) {
                    accumulator[attribute_code] = { 0: attribute_label };
                }

                const attrValue = getAttributeValueByType(curr);

                const transformAttributeValue = ({ attribute_type }) => {
                    if (attribute_type === 'boolean') {
                        return attrValue ? __('Yes') : __('No');
                    }

                    return attrValue;
                };

                accumulator[attribute_code] = {
                    ...accumulator[attribute_code],
                    [i + 1]: transformAttributeValue(curr)
                };

                return acc;
            }, {});

            return accumulator;
        }, []);

        return Object.values(attributeListObject);
    }

    updateProducts() {
        const { getComparedProducts } = this.props;
        getComparedProducts();
    }

    renderCompareProduct(product) {
        return (
            <>
                <ProductCompareCard product={ product } { ...this.props } />
            </>
        );
    }

    renderClearAllCard() {
        return (
            <li
              block="ProductCompareCard"
              elem="Wrapper"
              mix={ {
                  block: 'ProductCompareCard',
                  elem: 'ClearAllCard'
              } }
              key="00"
            >
                { this.renderClearAllButton() }
            </li>
        );
    }

    renderClearAllButton() {
        const { areCompareProductsLoading, removeAllProductsFromCompare } = this.props;

        return (
            <div
              block="Compare"
              elem="ClearAllWrapper"
              key="clearall"
            >
                <div
                  block="Compare"
                  elem="ClearButtonWrapper"
                >
                    <button
                      block="Button"
                      onClick={ (e) => {
                          if (!areCompareProductsLoading) removeAllProductsFromCompare();
                          e.preventDefault();
                      } }
                    >
                        <TextPlaceholder content={ __('Clear compare list') } />
                    </button>
                </div>
            </div>
        );
    }

    renderAttributeList() {
        const { products } = this.props;
        if (!products) return false;
        const attribute_list = this.getAttributeList(products);

        return (
            <ul
              block="Compare"
              elem="ProductAttributes"
              key="attributelist"
            >
                { attribute_list.map(row => this.renderIndividualRow(row)) }
            </ul>

        );
    }

    renderIndividualRow(row) {
        const { products } = this.props;
        return (
            <li
              block="Compare"
              elem="AttributeRow"
              key={ row[0] }
            >
                <div
                  block="Compare"
                  elem="AttributeValueWrapper"
                  key={ row[0] }
                >
                    { this.renderIndividualAttribute(row[0]) }
                    { products.map((product, index) => this.renderProductAttribute(product, index, row)) }
                </div>
            </li>
        );
    }

    renderIndividualAttribute(attribute) {
        return (
            <span
              block="Compare"
              elem="AttributeName"
              key={ attribute }
            >
              { attribute }
            </span>
        );
    }

    renderProductAttribute(product, index, row) {
        return (
            <span
              block="Compare"
              elem="AttributeValue"
              key={ index }
            >
                { row[index + 1] ? row[index + 1] : __('Not Specified') }
            </span>
        );
    }

    renderList() {
        const { products } = this.props;
        return (
            <div
              block="Compare"
              elem="ListsWrapper"
            >
                <ul
                  block="Compare"
                  elem="Products"
                  key="productlist"
                >
                    { this.renderClearAllCard() }
                    { products.map(product => this.renderCompareProduct(product)) }
                </ul>
                { this.renderAttributeList() }
            </div>
        );
    }

    renderEmpty() {
        return (<span>The compare list is empty.</span>);
    }

    render() {
        const { products } = this.props;

        return (
            <main block="Compare">
                <Meta metaObject={ { title: __('Compare') } } />
                <div
                  block="Compare"
                  elem="ProductWrapper"
                >
                    { products.length === 0 ? this.renderEmpty() : this.renderList() }
                </div>
            </main>
        );
    }
}

Compare.propTypes = {
    products: ItemsType,
    getComparedProducts: PropTypes.func.isRequired,
    removeAllProductsFromCompare: PropTypes.func.isRequired,
    areCompareProductsLoading: PropTypes.bool.isRequired
};

Compare.defaultProps = {
    products: []
};

export default Compare;
