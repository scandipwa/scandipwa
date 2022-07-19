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
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { AttributeType } from 'Type/ProductList.type';

import ProductConfigurableAttributeDropdown from './ProductConfigurableAttributeDropdown.component';

/** @namespace Component/ProductConfigurableAttributeDropdown/Container */
export class ProductConfigurableAttributeDropdownContainer extends PureComponent {
    static propTypes = {
        option: AttributeType.isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        getIsConfigurableAttributeAvailable: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        isUnselected: PropTypes.bool
    };

    static defaultProps = {
        isUnselected: false
    };

    containerFunctions = {
        onChange: this.onChange.bind(this)
    };

    onChange(value) {
        const {
            updateConfigurableVariant,
            option: { attribute_code }
        } = this.props;

        updateConfigurableVariant(attribute_code, value, true);
    }

    containerProps() {
        const { option: { attribute_code, attribute_label }, isUnselected } = this.props;

        return {
            selectValue: this._getSelectValue(),
            selectOptions: this._getSelectOptions(),
            selectName: attribute_code,
            selectLabel: attribute_label,
            isUnselected
        };
    }

    _getSelectOptions() {
        const {
            option: {
                attribute_options,
                attribute_code
            },
            getIsConfigurableAttributeAvailable
        } = this.props;

        if (!attribute_options) {
            // eslint-disable-next-line no-console
            console.warn(`Please make sure "${ attribute_code }" is visible on Storefront.`);

            return [];
        }

        return Object.values(attribute_options)
            .reduce((acc, option) => {
                const { value } = option;

                const isAvailable = getIsConfigurableAttributeAvailable({
                    attribute_code,
                    attribute_value: value
                });

                return [...acc, {
                    ...option,
                    id: value,
                    isAvailable
                }];
            }, []);
    }

    _getSelectValue() {
        const { option: { attribute_code } } = this.props;
        const { parameters = {} } = this.props;

        return parameters[attribute_code];
    }

    render() {
        return (
            <ProductConfigurableAttributeDropdown
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductConfigurableAttributeDropdownContainer;
