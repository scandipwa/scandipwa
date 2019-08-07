import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductAttributeValue.style';

class ProductAttributeValue extends Component {
    constructor(props) {
        super(props);

        this.getOptionLabel = this.getOptionLabel.bind(this);
    }

    getIsColorLight(hex) {
        const color = (hex.charAt(0) === '#') ? hex.substring(1, 7) : hex;
        const r = parseInt(color.substring(0, 2), 16); // hexToR
        const g = parseInt(color.substring(2, 4), 16); // hexToG
        const b = parseInt(color.substring(4, 6), 16); // hexToB
        return ((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186;
    }

    getOptionLabel(value) {
        const { attribute: { attribute_options } } = this.props;

        if (attribute_options) {
            const optionValues = attribute_options[value];
            if (optionValues) return optionValues;
        }

        return {};
    }

    renderTextAttribute() {
        const { attribute: { attribute_value } } = this.props;
        return this.renderStringValue(attribute_value);
    }

    renderBooleanAttribute() {
        const { attribute: { attribute_value } } = this.props;
        return this.renderStringValue(attribute_value ? __('Yes') : __('No'));
    }

    renderMultiSelectAttribute() {
        const { attribute: { attribute_value } } = this.props;

        const labelsArray = attribute_value.split(',').reduce((labels, value) => {
            const { label } = this.getOptionLabel(value);
            if (label) labels.push(label);
            return labels;
        }, []);

        return this.renderStringValue(labelsArray.length ? labelsArray.join(', ') : __('N/A'));
    }

    renderSelectAttribute() {
        const { attribute: { attribute_value } } = this.props;
        const attributeOption = this.getOptionLabel(attribute_value);
        const { label, swatch_data } = attributeOption;

        if (!swatch_data) return this.renderStringValue(label || __('N/A'));

        const { value, type } = swatch_data;

        switch (type) {
        case '0':
            return this.renderStringValue(value, label);
        case '1':
            return this.renderColorValue(value, label);
        case '2':
            return this.renderImageValue(value, label);
        default:
            return this.renderStringValue(__('N/A'));
        }
    }

    renderPlaceholder() {
        return this.renderStringValue();
    }

    renderColorValue(color, label) {
        const isLight = this.getIsColorLight(color);

        return (
            <data
              block="ProductAttributeValue"
              elem="Color"
              value={ label }
              style={ {
                  '--swatch-background-color': color,
                  '--swatch-border-color': isLight ? '#000' : color,
                  '--swatch-check-mark-background': isLight ? '#000' : '#fff'
              } }
            />
        );
    }

    renderImageValue(img, label) {
        return (
            <img
              block="ProductAttributeValue"
              elem="Image"
              src={ img }
              alt={ label }
            />
        );
    }

    renderStringValue(value, label) {
        return (
            <span
              block="ProductAttributeValue"
              elem="String"
              title={ label }
            >
                { value }
            </span>
        );
    }

    renderAttributeByType() {
        const { attribute: { attribute_type } } = this.props;

        switch (attribute_type) {
        case 'select':
            return this.renderSelectAttribute();
        case 'boolean':
            return this.renderBooleanAttribute();
        case 'text':
            return this.renderTextAttribute();
        case 'multiselect':
            return this.renderMultiSelectAttribute();
        default:
            return this.renderPlaceholder();
        }
    }

    render() {
        const {
            onClick,
            attribute: { attribute_code, attribute_value }
        } = this.props;
        if (attribute_code && !attribute_value) return null;
        return (
            <button
              block="ProductAttributeValue"
              onClick={ () => onClick() }
            >
                { this.renderAttributeByType() }
            </button>
        );
    }
}

ProductAttributeValue.propTypes = {
    onClick: PropTypes.func.isRequired,
    attribute: PropTypes.shape({
        attribute_code: PropTypes.string,
        attribute_type: PropTypes.string,
        attribute_value: PropTypes.string,
        attribute_label: PropTypes.string,
        attribute_options: PropTypes.objectOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
        }))
    }).isRequired
};

export default ProductAttributeValue;
