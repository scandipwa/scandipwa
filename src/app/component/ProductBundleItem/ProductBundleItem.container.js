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
import ProductCustomizableOptionContainer
    from 'Component/ProductCustomizableOption/ProductCustomizableOption.container';
import ProductBundleItem from './ProductBundleItem.component';

class ProductBundleItemContainer extends ProductCustomizableOptionContainer {
    static propTypes = {
        ...ProductCustomizableOptionContainer.propTypes,
        setCustomizableOptionTextFieldValue: PropTypes.func,
        updateQuantity: PropTypes.func.isRequired
    };

    static defaultProps = {
        ...ProductCustomizableOptionContainer.defaultProps,
        setCustomizableOptionTextFieldValue: () => {}
    };

    state = {
        ...this.state,
        itemData: [],
        selectedDropdownValueData: {}
    };

    containerFunctions = {
        ...this.containerFunctions,
        setCheckboxItemQuantity: this.setCheckboxItemQuantity.bind(this),
        setDropdownItemQuantity: this.setDropdownItemQuantity.bind(this)
    };

    setCheckboxItemQuantity(value, quantity) {
        const { itemData } = this.state;
        const selectedValue = { value, quantity };

        if (itemData.some(({ value: optionId }) => JSON.stringify(optionId) === JSON.stringify(value))) {
            const { updateQuantity } = this.props;

            updateQuantity(value, quantity);

            this.setState({
                itemData: itemData.map(el => (
                    JSON.stringify(el.value) === JSON.stringify(value) ? { ...el, quantity } : el
                ))
            });

            return;
        }

        this.setState({ itemData: [...itemData, selectedValue] });
    }

    getSelectedCheckboxValue(value) {
        const { option, setSelectedCheckboxValues } = this.props;
        const { itemData } = this.state;
        const { option_id } = option;
        const selectedItem = itemData.filter(
            item => JSON.stringify(item.value) === JSON.stringify([value])
        ) || [];

        setSelectedCheckboxValues(option_id, selectedItem);
    }

    setDropdownItemQuantity(optionId, quantity) {
        const { setSelectedDropdownValue, option: { option_id } } = this.props;
        const { selectedDropdownValue } = this.state;
        const value = selectedDropdownValue.toString();
        const selectedValue = { value, quantity };

        setSelectedDropdownValue(option_id, selectedValue);
    }

    setDropdownValue(value) {
        const { setSelectedDropdownValue, option } = this.props;
        const { selectedDropdownValue } = this.state;

        if (selectedDropdownValue === value) {
            setSelectedDropdownValue(null, option);
            this.setState({ selectedDropdownValue: 0 });
        } else {
            this.setState({ selectedDropdownValue: parseInt(value, 10) });
        }
    }

    getDropdownOptions(values) {
        return values.reduce((acc, {
            id,
            label,
            price_type,
            product: { price: { minimalPrice: { amount: { value } } } }
        }) => {
            acc.push({
                id,
                name: label,
                value: id,
                label: `${ label } + ${ this.renderOptionLabel(price_type, value) }`
            });

            return acc;
        }, []);
    }

    render() {
        return (
            <ProductBundleItem
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductBundleItemContainer;
