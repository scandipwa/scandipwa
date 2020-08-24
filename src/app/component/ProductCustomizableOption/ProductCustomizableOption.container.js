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

import { formatCurrency } from 'Util/Price';

import ProductCustomizableOption from './ProductCustomizableOption.component';

export class ProductCustomizableOptionContainer extends PureComponent {
    static propTypes = {
        option: PropTypes.object.isRequired,
        productOptionsData: PropTypes.object.isRequired,
        setSelectedCheckboxValues: PropTypes.func.isRequired,
        setCustomizableOptionTextFieldValue: PropTypes.func.isRequired,
        setSelectedDropdownValue: PropTypes.func.isRequired
    };

    state = {
        textValue: '',
        selectedDropdownValue: 0
    };

    containerFunctions = {
        getDropdownOptions: this.getDropdownOptions.bind(this),
        getSelectedCheckboxValue: this.getSelectedCheckboxValue.bind(this),
        updateTextFieldValue: this.updateTextFieldValue.bind(this),
        setDropdownValue: this.setDropdownValue.bind(this),
        renderOptionLabel: this.renderOptionLabel.bind(this)
    };

    containerProps = () => ({
        optionType: this.getOptionType(),
        requiredSelected: this.getIsRequiredSelected()
    });

    getOptionType() {
        const { option } = this.props;
        const { type } = option;

        return type;
    }

    getIsRequiredSelected() {
        const {
            productOptionsData,
            productOptionsData: {
                requiredOptions,
                productOptions,
                productOptionsMulti
            },
            option: {
                option_id
            }
        } = this.props;

        if (Object.keys(productOptionsData).length < 1 || !requiredOptions) {
            return true;
        }

        const selectedItems = [...productOptions || [], ...productOptionsMulti || []];
        const isRequired = requiredOptions.reduce((acc, item) => {
            if (item === option_id) {
                acc.push(item);
            }

            return acc;
        }, []);

        if (!isRequired.length) {
            return true;
        }

        const isRequiredSelected = selectedItems.reduce((acc, { option_id }) => {
            if (isRequired[0] === option_id) {
                acc.push(option_id);
            }

            return acc;
        }, []);

        return !!isRequiredSelected.length;
    }

    renderOptionLabel(priceType, price) {
        switch (priceType) {
        case 'PERCENT':
            return `${ price }%`;
        default:
            return `${ formatCurrency() }${ price }`;
        }
    }

    getSelectedCheckboxValue(value) {
        const { option, setSelectedCheckboxValues } = this.props;
        const { option_id } = option;

        setSelectedCheckboxValues(option_id, value);
    }

    updateTextFieldValue(value) {
        const { option, setCustomizableOptionTextFieldValue } = this.props;
        const { option_id } = option;

        setCustomizableOptionTextFieldValue(option_id, value);
        this.setState({ fieldValue: value });
    }

    setDropdownValue(value) {
        const { setSelectedDropdownValue, option } = this.props;
        const { selectedDropdownValue } = this.state;

        if (selectedDropdownValue === value) {
            setSelectedDropdownValue(null, option);
            this.setState({ selectedDropdownValue: 0 });
        } else {
            setSelectedDropdownValue(value, option);
            this.setState({ selectedDropdownValue: parseInt(value, 10) });
        }
    }

    getDropdownOptions(values) {
        return values.reduce((acc, {
            option_type_id, title, price, price_type
        }) => {
            acc.push({
                id: option_type_id,
                name: title,
                value: option_type_id,
                label: `${title} + ${this.renderOptionLabel(price_type, price)}`
            });

            return acc;
        }, []);
    }

    render() {
        return (
            <ProductCustomizableOption
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductCustomizableOptionContainer;
