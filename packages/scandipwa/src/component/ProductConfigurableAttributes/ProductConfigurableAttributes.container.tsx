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

import { AnimationEvent, PureComponent } from 'react';

import {
    BIG_PLACEHOLDER_CONFIG,
} from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.config';
import { ReactElement } from 'Type/Common.type';
import { GQLProductStockStatus } from 'Type/Graphql.type';
import { noopFn } from 'Util/Common';
import { getBooleanLabel } from 'Util/Product';

import ProductConfigurableAttributes from './ProductConfigurableAttributes.component';
import {
    ProductConfigurableAttribute,
    ProductConfigurableAttributesComponentContainerFunctions,
    ProductConfigurableAttributesComponentContainerPropsKeys,
    ProductConfigurableAttributesComponentProps,
    ProductConfigurableAttributesContainerProps,
    ProductConfigurableAttributesContainerState,
} from './ProductConfigurableAttributes.type';

/** @namespace Component/ProductConfigurableAttributes/Container */
export class ProductConfigurableAttributesContainer<
    P extends Readonly<ProductConfigurableAttributesContainerProps> = Readonly<ProductConfigurableAttributesContainerProps>,
    S extends ProductConfigurableAttributesContainerState = ProductConfigurableAttributesContainerState,
    > extends PureComponent<P, S> {
    static defaultProps: Partial<ProductConfigurableAttributesContainerProps> = {
        getLink: noopFn as unknown as (filterKey: string, value: string) => string,
        isExpandable: true,
        showProductAttributeAsLink: true,
        variants: [],
        isReady: true,
        mix: {},
        numberOfPlaceholders: BIG_PLACEHOLDER_CONFIG,
        inStock: true,
        updateAddToCartTriggeredWithError: noopFn,
        addToCartTriggeredWithError: false,
        isContentExpanded: false,

    };

    containerFunctions: ProductConfigurableAttributesComponentContainerFunctions = {
        handleOptionClick: this.handleOptionClick.bind(this),
        getSubHeading: this.getSubHeading.bind(this),
        isSelected: this.isSelected.bind(this),
        getLink: this.getLink.bind(this),
        getIsConfigurableAttributeAvailable: this.getIsConfigurableAttributeAvailable.bind(this),
        handleShakeAnimationEnd: this.handleShakeAnimationEnd.bind(this),
    };

    containerProps(): Pick<
    ProductConfigurableAttributesComponentProps,
    ProductConfigurableAttributesComponentContainerPropsKeys
    > {
        const {
            configurable_options,
            isExpandable,
            isReady,
            mix,
            numberOfPlaceholders,
            parameters,
            showProductAttributeAsLink,
            updateConfigurableVariant,
            inStock,
            addToCartTriggeredWithError,
            updateAddToCartTriggeredWithError,
            isContentExpanded,
        } = this.props;

        return {
            configurable_options,
            isExpandable,
            isReady,
            mix,
            numberOfPlaceholders,
            parameters,
            showProductAttributeAsLink,
            updateConfigurableVariant,
            inStock,
            addToCartTriggeredWithError,
            updateAddToCartTriggeredWithError,
            isContentExpanded,
        };
    }

    getLink({ attribute_code = '', attribute_value = '' }: Partial<ProductConfigurableAttribute>): string {
        const { getLink } = this.props;

        return getLink(attribute_code, attribute_value);
    }

    getSubHeading({
        attribute_values = [],
        attribute_code,
        attribute_options = {},
        is_boolean = false,
    }: Partial<ProductConfigurableAttribute>): string {
        return attribute_values.reduce((acc: string[], attribute_value) => (this.isSelected({
            attribute_code,
            attribute_value,
        })
            ? [...acc, getBooleanLabel(attribute_options[ attribute_value ].label, is_boolean)]
            : acc), []).join(', ');
    }

    handleOptionClick({ attribute_code = '', attribute_value = '' }: Partial<ProductConfigurableAttribute>): void {
        const { updateConfigurableVariant } = this.props;

        if (updateConfigurableVariant) {
            updateConfigurableVariant(attribute_code, attribute_value);
        }
    }

    isSelected({ attribute_code = '', attribute_value = '' }: Partial<ProductConfigurableAttribute>): boolean {
        const { parameters = {} as Record<string, string> } = this.props;
        const parameter = parameters[ attribute_code ];

        if (parameter === undefined) {
            return false;
        }

        if (parameter.length !== undefined) {
            return parameter.includes(attribute_value);
        }

        return parameter === attribute_value;
    }

    handleShakeAnimationEnd(e: AnimationEvent<HTMLElement>): void {
        e.preventDefault();
        const { updateAddToCartTriggeredWithError } = this.props;

        (e.target as HTMLElement)?.classList?.remove('[class*=_isUnselected]');

        updateAddToCartTriggeredWithError();
    }

    getIsConfigurableAttributeAvailable(
        { attribute_code = '', attribute_value = '' }: Partial<ProductConfigurableAttribute>,
    ): boolean {
        const { parameters, variants } = this.props;

        // skip out of stock check, if variants data has not been provided
        if (!variants.length) {
            return true;
        }

        const isAttributeSelected = Object.hasOwnProperty.call(parameters, attribute_code);

        // If value matches current attribute_value, option should be enabled
        if (isAttributeSelected && parameters[ attribute_code ] === attribute_value) {
            return true;
        }

        const parameterPairs = Object.entries(parameters);

        const selectedAttributes = isAttributeSelected
            // Need to exclude itself, otherwise different attribute_values of the same attribute_code will always be disabled
            ? parameterPairs.filter(([key]) => key !== attribute_code)
            : parameterPairs;

        return variants
            .some(({ stock_status, attributes }) => {
                const { attribute_value: foundValue } = attributes[ attribute_code ] || {};

                return (
                    stock_status === GQLProductStockStatus.IN_STOCK
                    // Variant must have currently checked attribute_code and attribute_value
                    && foundValue === attribute_value
                    // Variant must have all currently selected attributes
                    && selectedAttributes.every(([key, value]) => attributes[ key ].attribute_value === value)
                );
            });
    }

    render(): ReactElement {
        return (
            <ProductConfigurableAttributes
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default ProductConfigurableAttributesContainer;
