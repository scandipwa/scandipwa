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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ProductAttributeValue from 'Component/ProductAttributeValue';
import ProductConfigurableAttributeDropdown from 'Component/ProductConfigurableAttributeDropdown';
import { MixType } from 'Type/Common.type';
import { AttributesType } from 'Type/ProductList.type';
import { noopFn } from 'Util/Common';

import './ProductConfigurableAttributes.style';

/** @namespace Component/ProductConfigurableAttributes/Component */
export class ProductConfigurableAttributes extends PureComponent {
    static propTypes = {
        renderPlaceholder: PropTypes.func,
        configurable_options: AttributesType.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        isReady: PropTypes.bool,
        mix: MixType,
        getIsConfigurableAttributeAvailable: PropTypes.func,
        handleShakeAnimationEnd: PropTypes.func,
        handleOptionClick: PropTypes.func.isRequired,
        isSelected: PropTypes.func.isRequired,
        getLink: PropTypes.func.isRequired,
        isExpandable: PropTypes.bool,
        showProductAttributeAsLink: PropTypes.bool,
        inStock: PropTypes.bool.isRequired,
        addToCartTriggeredWithError: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isReady: true,
        mix: {},
        getIsConfigurableAttributeAvailable: () => true,
        renderPlaceholder: noopFn,
        handleShakeAnimationEnd: noopFn,
        isExpandable: true,
        showProductAttributeAsLink: true
    };

    renderConfigurableAttributeValue(attribute) {
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

    renderSwatch(option, isUnselected) {
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

    renderDropdown(option, isUnselected) {
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

    renderAttributesPlaceholder() {
        const { renderPlaceholder } = this.props;

        return (
            <div block="ProductConfigurableAttributes" elem="PlaceholderWrapper">
                { renderPlaceholder('ProductConfigurableAttributes') }
            </div>
        );
    }

    renderConfigurableAttributes() {
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
            const isUnselected = addToCartTriggeredWithError ? !parameters[attribute_code] : null;
            const [{ swatch_data }] = attribute_options ? Object.values(attribute_options) : [{}];
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

    render() {
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
