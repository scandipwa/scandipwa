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

/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
// Disabled due placeholder needs

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ProductType } from 'Type/ProductList';
import Field from 'Component/Field';
import Swatch from 'Component/Swatch';
import ProductPrice from 'Component/ProductPrice';
import AddToCart from 'Component/AddToCart';
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import GroupedProductList from 'Component/GroupedProductsList';
import './ProductActions.style';

/**
 * Product actions
 * @class ProductActions
 */
class ProductActions extends PureComponent {
    renderGroupedProductOptions() {
        const { product, groupedProductQuantity, product: { type_id } } = this.props;

        if (type_id === 'grouped') {
            return (
                <section
                  block="ProductActions"
                  elem="Section"
                  mods={ { type: 'grouped' } }
                  aria-label="Product short description"
                >
                    <GroupedProductList
                      product={ product }
                      groupedProductQuantity={ groupedProductQuantity }
                    />
                </section>
            );
        }

        return null;
    }

    renderSkuAndStock() {
        const { product: { sku }, showOnlyIfLoaded } = this.props;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'sku' } }
              aria-label="Product SKU and availability"
            >
                { showOnlyIfLoaded(
                    sku,
                    (<>
                        <span block="ProductActions" elem="Sku" itemProp="sku">{ `SKU: ${ sku }` }</span>
                        <span block="ProductActions" elem="Stock">In Stock</span>
                    </>),
                    <TextPlaceholder />
                ) }
            </section>
        );
    }

    renderShortDescription() {
        const {
            product: { short_description, brand },
            showOnlyIfLoaded
        } = this.props;
        const { html } = short_description || {};
        const htmlWithItemProp = `<div itemProp="description">${html}</div>`;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'short' } }
              aria-label="Product short description"
            >
                { showOnlyIfLoaded(
                    brand,
                    (
                        <h4
                          block="ProductActions"
                          elem="SectionHeading"
                          mods={ { type: 'brand' } }
                          itemProp="brand"
                        >
                            <TextPlaceholder content={ brand } />
                        </h4>
                    )
                ) }
                <div block="ProductActions" elem="ShortDescription">
                    { html ? <Html content={ htmlWithItemProp } /> : <TextPlaceholder length="long" /> }
                </div>
            </section>
        );
    }

    renderNameAndBrand() {
        const { product: { brand, name }, showOnlyIfLoaded } = this.props;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'name' } }
            >
                { showOnlyIfLoaded(
                    brand,
                    (
                        <h4 block="ProductActions" elem="Brand" itemProp="brand">
                            <TextPlaceholder content={ brand } />
                        </h4>
                    )
                ) }
                <p block="ProductActions" elem="Title" itemProp="name">
                    <TextPlaceholder content={ name } length="medium" />
                </p>
            </section>
        );
    }

    renderQuantityInput() {
        const { quantity, setQuantity } = this.props;

        return (
            <Field
              id="item_qty"
              name="item_qty"
              type="number"
              min={ 1 }
              value={ quantity }
              mix={ { block: 'ProductActions', elem: 'Qty' } }
              onChange={ value => setQuantity(value) }
            />
        );
    }

    renderAddToCart() {
        const {
            configurableVariantIndex,
            product,
            groupedProductQuantity,
            quantity,
            setQuantityToDefault
        } = this.props;

        return (
            <AddToCart
              product={ product }
              configurableVariantIndex={ configurableVariantIndex }
              mix={ { block: 'ProductActions', elem: 'AddToCart' } }
              groupedProductQuantity={ groupedProductQuantity }
              quantity={ quantity }
              setQuantityToDefault={ setQuantityToDefault }
            />
        );
    }

    renderPrice() {
        const { product: { price } } = this.props;

        return (
            <ProductPrice
              price={ price }
              mix={ { block: 'ProductActions', elem: 'Price' } }
            />
        );
    }

    renderOtherOptions() {
        const { availableFilters, showOnlyIfLoaded } = this.props;
        const hasAvailableFilter = Object.keys(availableFilters).length;

        return showOnlyIfLoaded(
            hasAvailableFilter,
            (Object.entries(availableFilters).map(([code, option]) => {
                if (code === 'color') return null;
                const { label: optionLabel = '' } = option;

                return (
                    <section
                      key={ code }
                      block="ProductActions"
                      elem="Section"
                      mods={ { type: optionLabel.toLowerCase() } }
                      mix={ { block: 'ProductActions', elem: 'Option' } }
                      aria-label={ `${ optionLabel } options` }
                    >
                        <h4 block="ProductActions" elem="SectionHeading" itemProp="color">{ optionLabel }</h4>
                        {/* { values.map(({ value, label, id }) => (
                            <Swatch
                              key={ id }
                              onClick={ () => this.changeConfigurableVariant(code, id) }
                              mix={ { block: 'ProductActions', elem: 'TextOption' } }
                              isSelected={ this.getIsOptionInCurrentVariant(code, id) }
                              filterItem={ { label, swatch_data: { value } } }
                              requestVar={ code }
                            />
                        )) } */}
                    </section>
                );
            })),
            (
                <section
                  block="ProductActions"
                  elem="Section"
                  mix={ { block: 'ProductActions', elem: 'Option' } }
                  aria-label="Loading other options"
                >
                    <h4 block="ProductActions" elem="SectionHeading">
                        <TextPlaceholder />
                    </h4>
                    { new Array(4).fill().map((_, i) => (
                        <Swatch
                          key={ i }
                          mix={ { block: 'ProductActions', elem: 'PlaceholderOption' } }
                          requestVar="placeholder"
                        />
                    )) }
                </section>
            )
        );
    }

    renderColorOptions() {
        const {
            availableFilters: { color },
            areDetailsLoaded,
            showOnlyIfLoaded,
            changeConfigurableVariant,
            getIsOptionInCurrentVariant
        } = this.props;
        const { values: colorOptions = [] } = color || {};

        const renderColor = content => (
            <section block="ProductActions" elem="Colors" aria-label="Color options">
                <h4 block="ProductActions" elem="SectionHeading" mods={ { type: 'color' } }>
                    <TextPlaceholder content={ areDetailsLoaded && 'Color' } />
                </h4>
                { content }
            </section>
        );

        return showOnlyIfLoaded(
            color,
            renderColor(colorOptions.map(({ value, label, id }) => (
                <Swatch
                  key={ id }
                  mix={ { block: 'ProductActions', elem: 'Color' } }
                  onClick={ changeConfigurableVariant('color', id) }
                  isSelected={ getIsOptionInCurrentVariant('color', id) }
                  filterItem={ { label, swatch_data: { value } } }
                  requestVar="color"
                />
            ))),
            renderColor(new Array(4).fill().map((_, i) => (
                <Swatch
                  key={ i }
                  requestVar="color"
                  mix={ { block: 'ProductActions', elem: 'Color' } }
                />
            )))
        );
    }

    render() {
        return (
            <article block="ProductActions">
                { this.renderColorOptions() }
                { this.renderPrice() }
                <div block="ProductActions" elem="AddToCartWrapper">
                  { this.renderAddToCart() }
                  { this.renderQuantityInput() }
                </div>
                { this.renderOtherOptions() }
                { this.renderNameAndBrand() }
                { this.renderSkuAndStock() }
                { this.renderGroupedProductOptions() }
                { this.renderShortDescription() }
            </article>
        );
    }
}

ProductActions.propTypes = {
    product: ProductType.isRequired,
    availableFilters: PropTypes.objectOf(PropTypes.shape).isRequired,
    configurableVariantIndex: PropTypes.number,
    updateConfigurableVariantIndex: PropTypes.func.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired,
    groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired
};

ProductActions.defaultProps = {
    configurableVariantIndex: 0
};

export default ProductActions;
