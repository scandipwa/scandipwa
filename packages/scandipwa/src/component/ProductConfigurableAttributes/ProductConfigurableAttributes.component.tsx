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

import { PureComponent } from 'react';

import ProductAttributeValue from 'Component/ProductAttributeValue';
import ProductConfigurableAttributeDropdown from 'Component/ProductConfigurableAttributeDropdown';
import { ProductListFilter } from 'Store/ProductListInfo/ProductListInfo.type';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { IndexedConfigurableOption } from 'Util/Product/Product.type';

import {
    ProductConfigurableAttribute,
    ProductConfigurableAttributesComponentProps
} from './ProductConfigurableAttributes.type';

import './ProductConfigurableAttributes.style';

/** @namespace Component/ProductConfigurableAttributes/Component */
export class ProductConfigurableAttributes extends PureComponent<ProductConfigurableAttributesComponentProps> {
    static defaultProps = {
        isReady: true,
        mix: {},
        getIsConfigurableAttributeAvailable: (): boolean => true,
        renderPlaceholder: noopFn,
        handleShakeAnimationEnd: noopFn,
        isExpandable: true,
        showProductAttributeAsLink: true
    };

    renderConfigurableAttributeValue(attribute: ProductConfigurableAttribute): ReactElement {
        const {
            getIsConfigurableAttributeAvailable,
            handleOptionClick,
            getLink,
            isSelected,
            showProductAttributeAsLink,
            inStock
        } = this.props;

        const { attribute_value } = attribute;

        return (
            <ProductAttributeValue
              key={ attribute_value }
              attribute={ attribute }
              isSelected={ isSelected(attribute) }
              isAvailable={ getIsConfigurableAttributeAvailable(attribute) && inStock }
              onClick={ handleOptionClick }
              getLink={ getLink }
              showProductAttributeAsLink={ showProductAttributeAsLink }
            />
        );
    }

    renderSwatch(option: IndexedConfigurableOption, isUnselected = false): ReactElement {
        const {
            handleShakeAnimationEnd
        } = this.props;
        const { attribute_values, attribute_code } = option;

        return (
            <div
              block="ProductConfigurableAttributes"
              elem="SwatchList"
              mods={ { isUnselected } }
              key={ attribute_code }
              onAnimationEnd={ handleShakeAnimationEnd }
            >
                { attribute_values.map((attribute_value) => (
                    this.renderConfigurableAttributeValue({ ...option, attribute_value })
                )) }
            </div>
        );
    }

    renderDropdown(option: IndexedConfigurableOption, isUnselected = false): ReactElement {
        const {
            updateConfigurableVariant,
            getIsConfigurableAttributeAvailable,
            parameters,
            handleShakeAnimationEnd
        } = this.props;

        return (
            <ProductConfigurableAttributeDropdown
              handleShakeAnimationEnd={ handleShakeAnimationEnd }
              isUnselected={ isUnselected }
              option={ option }
              updateConfigurableVariant={ updateConfigurableVariant }
              getIsConfigurableAttributeAvailable={ getIsConfigurableAttributeAvailable }
              parameters={ parameters }
            />
        );
    }

    renderAttributesPlaceholder(): ReactElement {
        const { renderPlaceholder } = this.props;

        return (
            <div block="ProductConfigurableAttributes" elem="PlaceholderWrapper">
                { renderPlaceholder('ProductConfigurableAttributes') }
            </div>
        );
    }

    renderConfigurableAttributes(): ReactElement {
        const {
            configurable_options,
            isExpandable,
            inStock,
            handleShakeAnimationEnd,
            addToCartTriggeredWithError,
            parameters
        } = this.props;

        return Object.values(configurable_options).map((option) => {
            const {
                attribute_code,
                attribute_label,
                attribute_options,
                attribute_id
            } = option;
            const isUnselected = addToCartTriggeredWithError ? !parameters[attribute_code] : false;
            const [{ swatch_data }] = attribute_options
                ? Object.values(attribute_options)
                : [{ swatch_data: undefined }];
            const isSwatch = !!swatch_data;

            // render content without heading and subheading
            if (!isExpandable) {
                return isSwatch ? this.renderSwatch(option) : this.renderDropdown(option);
            }

            if (!inStock && !isSwatch) {
                return null;
            }

            const selectedOption = parameters[attribute_code];
            const selectedOptionLabel = selectedOption ? attribute_options[selectedOption]?.label : '';

            return (
                <div key={ attribute_id }>
                    <p
                      block="ProductConfigurableAttributes"
                      elem="Title"
                      mods={ { isUnselected } }
                      onAnimationEnd={ handleShakeAnimationEnd }
                    >
                        { attribute_label }
                        { isSwatch && (
                            <span block="ProductConfigurableAttributes" elem="SelectedOptionLabel">
                                { selectedOptionLabel }
                            </span>
                        ) }
                    </p>
                    { isSwatch ? this.renderSwatch(option, isUnselected) : this.renderDropdown(option, isUnselected) }
                </div>
            );
        });
    }

    render(): ReactElement {
        const { isReady, mix } = this.props;

        return (
            <div
              block="ProductConfigurableAttributes"
              mods={ { isLoading: !isReady } }
              mix={ mix }
            >
                { isReady ? this.renderConfigurableAttributes() : this.renderAttributesPlaceholder() }
            </div>
        );
    }
}

export default ProductConfigurableAttributes;
