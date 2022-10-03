/* eslint-disable no-magic-numbers */

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

import {
    CSSProperties, KeyboardEvent, MouseEvent, PureComponent,
} from 'react';

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Html from 'Component/Html';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { getBooleanLabel } from 'Util/Product';

import { AttributeType, SelectAttributeType, STRING_ONLY_ATTRIBUTE_CODES } from './ProductAttributeValue.config';
import { ProductAttributeValueComponentProps, ProductAttributeValueOption } from './ProductAttributeValue.type';

import './ProductAttributeValue.style';

/** @namespace Component/ProductAttributeValue/Component */
export class ProductAttributeValueComponent extends PureComponent<ProductAttributeValueComponentProps> {
    static defaultProps: Partial<ProductAttributeValueComponentProps> = {
        isSelected: false,
        onClick: noopFn,
        getLink: noopFn,
        mix: {},
        isAvailable: true,
        isFormattedAsText: false,
        isProductCountVisible: false,
        showProductAttributeAsLink: true,
    };

    __construct(props: ProductAttributeValueComponentProps): void {
        super.__construct?.(props);

        this.clickHandler = this.clickHandler.bind(this);
        this.renderSublabel = this.renderSublabel.bind(this);
        this.getOptionLabel = this.getOptionLabel.bind(this);
        this.getCheckboxLabel = this.getCheckboxLabel.bind(this);
    }

    getIsColorLight(hex: string): boolean {
        const color = (hex.charAt(0) === '#') ? hex.substring(1, 7) : hex;
        const r = parseInt(color.substring(0, 2), 16); // hexToR
        const g = parseInt(color.substring(2, 4), 16); // hexToG
        const b = parseInt(color.substring(4, 6), 16); // hexToB

        return ((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186;
    }

    getOptionLabel(value: string): Partial<ProductAttributeValueOption> {
        const {
            attribute: {
                attribute_options,
                is_boolean,
            },
            isProductCountVisible,
        } = this.props;

        if (attribute_options) {
            const optionValues = attribute_options[value];

            if (optionValues) {
                if (!isProductCountVisible) {
                    const { label } = optionValues;

                    return { ...optionValues, labelText: label };
                }

                const { label, count = 0 } = optionValues;

                const adjustedLabel = getBooleanLabel(label, is_boolean);

                return {
                    ...optionValues,
                    label: `${adjustedLabel} (${count})`,
                    labelText: adjustedLabel.trim(),
                    count,
                };
            }
        }

        return {};
    }

    clickHandler(e: MouseEvent | KeyboardEvent): void {
        const { onClick, attribute, isAvailable } = this.props;

        e.preventDefault();
        e.stopPropagation();

        if (!isAvailable) {
            return;
        }

        onClick(attribute);
    }

    renderTextAttribute(): ReactElement {
        const { attribute: { attribute_value } } = this.props;

        return this.renderStringValue(attribute_value);
    }

    renderBooleanAttribute(): ReactElement {
        const { attribute: { attribute_value = '' } } = this.props;

        return this.renderStringValue(+attribute_value ? __('Yes') : __('No'));
    }

    renderMultiSelectAttribute(): ReactElement {
        const { attribute: { attribute_value = '' } } = this.props;

        const labelsArray = attribute_value.split(',').reduce((labels: string[], value) => {
            const { label } = this.getOptionLabel(value);

            if (label) {
                labels.push(label);
            }

            return labels;
        }, []);

        return this.renderStringValue(labelsArray.length ? labelsArray.join(', ') : __('N/A'));
    }

    renderSelectAttribute(): ReactElement {
        const {
            attribute: {
                attribute_value = '',
                attribute_code = '',
                has_swatch,
            },
        } = this.props;
        const attributeOption = this.getOptionLabel(attribute_value);
        const {
            label, labelText, count, swatch_data,
        } = attributeOption;

        // skip attributes without valid swatches
        if (!swatch_data && has_swatch) {
            return null;
        }

        if (!swatch_data || STRING_ONLY_ATTRIBUTE_CODES.includes(attribute_code)) {
            return this.renderStringValue(labelText || __('N/A'), null, count);
        }

        const { value, type } = swatch_data;

        switch (type) {
        case SelectAttributeType.STRING:
            return this.renderStringValue(value, labelText, count);
        case SelectAttributeType.COLOR:
            return this.renderColorValue(value, label);
        case SelectAttributeType.IMAGE:
            return this.renderImageValue(value, label);
        default:
            return this.renderStringValue(labelText || __('N/A'), labelText, count);
        }
    }

    renderImageAttribute(): ReactElement {
        const {
            attribute: {
                attribute_label,
                attribute_value,
            },
        } = this.props;

        if (!attribute_value || attribute_value === 'no_selection') {
            return this.renderPlaceholder();
        }

        return (
            <img
              block="ProductAttributeValue"
              elem="MediaImage"
              src={ `/media/catalog/product${attribute_value}` }
              alt={ attribute_label }
            />
        );
    }

    renderTextAreaAttribute(): ReactElement {
        const {
            attribute: { attribute_value = '' },
        } = this.props;

        return (
            <div
              block="ProductAttributeValue"
              elem="TextArea"
            >
                <Html content={ attribute_value } />
            </div>
        );
    }

    renderPlaceholder(): ReactElement {
        return (
            <div
              block="ProductAttributeValue"
              elem="Placeholder"
            />
        );
    }

    renderColorValue(color: string, label: string | undefined): ReactElement {
        const { isFormattedAsText, isSelected } = this.props;
        const isLight = this.getIsColorLight(color);

        if (isFormattedAsText) {
            return label || __('N/A');
        }

        const style = {
            '--option-background-color': color,
            '--option-border-color': isLight ? '#dddddd' : color,
            '--option-check-mark-background': isLight ? '#000' : '#fff',
            // stylelint-disable-next-line value-keyword-case
            '--option-is-selected': isSelected ? 1 : 0,
        } as CSSProperties;

        return (
            <data
              block="ProductAttributeValue"
              elem="Color"
              value={ label }
              title={ label }
              style={ style }
            />
        );
    }

    renderImageValue(img: string, label: string | undefined): ReactElement {
        const { isFormattedAsText, isSelected } = this.props;

        if (isFormattedAsText) {
            return label || __('N/A');
        }

        const style = {
            '--option-is-selected': isSelected ? 1 : 0,
        } as CSSProperties;

        return (
            <>
                <img
                  block="ProductAttributeValue"
                  elem="Image"
                  src={ `/media/attribute/swatch${img}` }
                  alt={ label }
                />
                <data
                  block="ProductAttributeValue"
                  elem="Image-Overlay"
                  value={ label }
                  title={ label }
                  style={ style }
                />
            </>
        );
    }

    renderSublabel(subLabel: string): ReactElement {
        const { isProductCountVisible } = this.props;

        if (!subLabel || !isProductCountVisible) {
            return null;
        }

        return (
            <strong
              block="ProductAttributeValue"
              elem="SubLabel"
            >
              { `(${subLabel})` }
            </strong>
        );
    }

    renderCheckboxValue(value: string): ReactElement {
        if (typeof value !== 'string') {
            return value;
        }

        return <Html content={ value } />;
    }

    getCheckboxLabel(value: string, subLabel: string): ReactElement {
        return (
            <div
              block="ProductAttributeValue"
              elem="Label"
            >
                { this.renderCheckboxValue(value) }
                { this.renderSublabel(subLabel) }
            </div>
        );
    }

    renderDropdown(value: string, subLabel: string): ReactElement {
        const { isSelected } = this.props;

        return (
            <Field
              type={ FieldType.CHECKBOX }
              attr={ {
                  id: value,
                  name: value,
                  checked: isSelected,
              } }
              label={ this.getCheckboxLabel(value, subLabel) }
              mix={ {
                  block: 'ProductAttributeValue',
                  elem: 'Text',
                  mods: { isSelected },
              } }
            />
        );
    }

    renderValue(value?: string): ReactElement | boolean {
        if (value) {
            return <Html content={ `${value}` } />;
        }

        return false;
    }

    renderStringValue(value: string | undefined, label: string | null = null, count = 0): ReactElement {
        const { isFormattedAsText, isSelected } = this.props;
        const isSwatch = !!label;

        if (isFormattedAsText) {
            return label || this.renderValue(value) || __('N/A');
        }

        if (!isSwatch) {
            return this.renderDropdown(value || '', String(count));
        }

        return (
            <span
              block="ProductAttributeValue"
              elem="String"
              mods={ { isSelected } }
              title={ label }
            >
                { value }
            </span>
        );
    }

    renderNumericAttribute(): ReactElement {
        const { attribute: { attribute_value = '0' } } = this.props;

        return this.renderStringValue(parseFloat(attribute_value).toFixed(2));
    }

    renderAttributeByType(): ReactElement {
        const { attribute: { attribute_type } } = this.props;

        switch (attribute_type) {
        case AttributeType.SELECT:
            return this.renderSelectAttribute();
        case AttributeType.BOOLEAN:
            return this.renderBooleanAttribute();
        case AttributeType.TEXT:
            return this.renderTextAttribute();
        case AttributeType.MULTISELECT:
            return this.renderMultiSelectAttribute();
        case AttributeType.MEDIA_IMAGE:
            return this.renderImageAttribute();
        case AttributeType.TEXTAREA:
            return this.renderTextAreaAttribute();
        case AttributeType.WEIGHT:
            return this.renderNumericAttribute();
        default:
            return this.renderPlaceholder();
        }
    }

    render(): ReactElement {
        const {
            getLink,
            attribute,
            isAvailable,
            attribute: { attribute_code, attribute_value },
            mix,
            isFormattedAsText,
            showProductAttributeAsLink,
        } = this.props;

        if (attribute_code && !attribute_value) {
            return null;
        }

        const href = getLink(attribute) || undefined;
        // Invert to apply css rule without using not()
        const isNotAvailable = !isAvailable;

        if (isFormattedAsText) {
            return (
                <div
                  block="ProductAttributeValue"
                  mix={ mix }
                >
                    { this.renderAttributeByType() }
                </div>
            );
        }

        if (!showProductAttributeAsLink) {
            return (
                <span
                  block="ProductAttributeValue"
                  mods={ { isNotAvailable } }
                  onClick={ this.clickHandler }
                  onKeyDown={ this.clickHandler }
                  role="link"
                  tabIndex={ -1 }
                  aria-hidden={ isNotAvailable }
                  mix={ mix }
                >
                    { this.renderAttributeByType() }
                </span>
            );
        }

        return (
            <>
                { /* eslint-disable-next-line react/forbid-elements */ }
                <a
                  href={ href }
                  block="ProductAttributeValue"
                  mods={ { isNotAvailable } }
                  onClick={ this.clickHandler }
                  aria-hidden={ isNotAvailable }
                  mix={ mix }
                >
                    { this.renderAttributeByType() }
                </a>
            </>
        );
    }
}

export default ProductAttributeValueComponent;
