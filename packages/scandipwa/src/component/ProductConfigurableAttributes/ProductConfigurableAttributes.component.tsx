/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import ProductAttributeValue from 'Component/ProductAttributeValue';
import { ProductAttributeShape } from 'Component/ProductAttributeValue/ProductAttributeValue.type';
import ProductConfigurableAttributeDropdown from 'Component/ProductConfigurableAttributeDropdown';
import { SMALL_PLACEHOLDER_CONFIG } from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.config';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import {
    ProductConfigurableAttribute,
    ProductConfigurableAttributesComponentProps,
} from './ProductConfigurableAttributes.type';

import './ProductConfigurableAttributes.style';

/** @namespace Component/ProductConfigurableAttributes/Component */
export class ProductConfigurableAttributes<
P extends ProductConfigurableAttributesComponentProps = ProductConfigurableAttributesComponentProps,
> extends PureComponent<P> {
    static defaultProps: Partial<ProductConfigurableAttributesComponentProps> = {
        isReady: true,
        mix: {},
        getIsConfigurableAttributeAvailable: (): boolean => true,
        handleShakeAnimationEnd: noopFn,
        isExpandable: true,
        showProductAttributeAsLink: true,
    };

    renderConfigurableAttributeValue(attribute: Partial<ProductConfigurableAttribute>): ReactElement {
        const {
            getIsConfigurableAttributeAvailable,
            handleOptionClick,
            getLink,
            isSelected,
            showProductAttributeAsLink,
            inStock,
        } = this.props;

        const { attribute_value } = attribute;

        return (
            <ProductAttributeValue
              key={ attribute_value }
              attribute={ attribute }
              isSelected={ isSelected(attribute) }
              isAvailable={ getIsConfigurableAttributeAvailable(attribute) && inStock }
              onClick={ handleOptionClick as (o: Partial<ProductAttributeShape>) => void }
              getLink={ getLink as (o: Partial<ProductAttributeShape>) => string }
              showProductAttributeAsLink={ showProductAttributeAsLink }
            />
        );
    }

    renderSwatch(option: Partial<ProductConfigurableAttribute>, isUnselected = false): ReactElement {
        const {
            handleShakeAnimationEnd,
        } = this.props;
        const { attribute_values = [], attribute_code } = option;

        return (
            <div
              block="ProductConfigurableAttributes"
              elem="SwatchList"
              mods={ { isUnselected } }
              key={ attribute_code }
              onAnimationEnd={ handleShakeAnimationEnd }
            >
                { attribute_values.map((attribute_value) => (
                    this.renderConfigurableAttributeValue(
                        { ...option, attribute_value } as unknown as Partial<ProductConfigurableAttribute>,
                    )
                )) }
            </div>
        );
    }

    renderDropdown(option: Partial<ProductConfigurableAttribute>, isUnselected = false): ReactElement {
        const {
            updateConfigurableVariant,
            getIsConfigurableAttributeAvailable,
            parameters,
            handleShakeAnimationEnd,
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

    renderPlaceholders(): ReactElement {
        const { numberOfPlaceholders, isExpandable } = this.props;
        const numberOfPlaceholdersToRender = isExpandable ? numberOfPlaceholders : SMALL_PLACEHOLDER_CONFIG;

        const arr = Array.from({ length: 30 }, (_, index) => index + 1);

        return numberOfPlaceholdersToRender.map((length, i) => (
            <div
              key={ arr[i] }
              block="ProductConfigurableAttributes"
              elem="SwatchList"
            >
                { Array.from({ length }, (_, i) => (
                    <div
                      key={ `child-${arr[i]}` }
                      block="ProductConfigurableAttributes"
                      elem="Placeholder"
                    />
                )) }
            </div>
        ));
    }

    renderConfigurableAttributes(): ReactElement {
        const {
            configurable_options,
            isExpandable,
            inStock,
            handleShakeAnimationEnd,
            addToCartTriggeredWithError,
            parameters,
        } = this.props;

        return Object.values(configurable_options).map((option) => {
            const {
                attribute_code = '',
                attribute_label,
                attribute_options = {},
                attribute_id,
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

            const selectedOption = parameters[attribute_code]?.toString();
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
                { isReady ? this.renderConfigurableAttributes() : this.renderPlaceholders() }
            </div>
        );
    }
}

export default ProductConfigurableAttributes;
