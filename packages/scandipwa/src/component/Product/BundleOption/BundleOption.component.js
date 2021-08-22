/* eslint-disable */
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
import { FIELD_TYPE } from 'Config/Field.config';
import { bundleOptionToLabel, getEncodedBundleUid } from 'Util/Product/Transform';
import FieldContainer from 'Component/PureForm/Field';
import FieldGroupContainer from 'Component/PureForm/FieldGroup';
import { VALIDATION_INPUT_TYPE_NUMBER } from 'Util/Validator/Config';

export class BundleOption extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        quantity: PropTypes.array.isRequired,
        setQuantity: PropTypes.func.isRequired,
        isRequired: PropTypes.bool.isRequired,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        updateSelectedValues: PropTypes.func.isRequired,
        dropdownOptions: PropTypes.array.isRequired,
        currencyCode: PropTypes.string.isRequired,
        activeSelectUid: PropTypes.string.isRequired,
        updateActiveSelectUid: PropTypes.func.isRequired
    };

    renderMap = {
        [FIELD_TYPE.checkbox]: this.renderCheckBoxValues.bind(this),
        [FIELD_TYPE.multi]: this.renderCheckBoxValues.bind(this),
        [FIELD_TYPE.radio]: this.renderRadioValues.bind(this),
        [FIELD_TYPE.select]: this.renderSelectValue.bind(this)
    };

    componentDidMount() {
        const { updateSelectedValues } = this.props;
        updateSelectedValues();
    }

    getLabel(option) {
        const { currencyCode } = this.props;
        const {
            baseLabel,
            priceLabel
        } = bundleOptionToLabel(option, currencyCode);

        return (
            <>
                { baseLabel }
                <strong> { priceLabel }</strong>
            </>
        );
    }

    setQuantity(uid, quantity) {
        const { setQuantity } = this.props;
        setQuantity(uid, quantity);
    }

    renderQuantityChange(uid, quantity) {
        return (
            <FieldContainer
                type={ FIELD_TYPE.number }
                attr={ {
                    id: `item_qty_${uid}`,
                    name: `item_qty_${uid}`,
                    defaultValue: quantity,
                    min: 0
                } }
                validationRule={ {
                    inputType: VALIDATION_INPUT_TYPE_NUMBER.numeric,
                    isRequired: true,
                    range: {
                        min: 0
                    }
                } }
                events={ { onChange: this.setQuantity.bind(this, uid) } }
                validateOn={ ["onChange"] }
            />
        );
    }

    renderCheckBox = (option) => {
        const {
            uid,
            can_change_quantity,
            is_default,
            quantity: defaultQuantity = 1
        } = option;

        const {
            updateSelectedValues,
            quantity: { [uid]: quantity = defaultQuantity }
        } = this.props;

        const label = this.getLabel(option);

        return (
            <div block="ProductBundleItem" elem="Checkbox" mods={ { customQuantity: can_change_quantity } } key={ uid }>
                <FieldContainer
                    type={ FIELD_TYPE.checkbox }
                    label={ label }
                    attr={{
                        id: `option-${ uid }`,
                        value: can_change_quantity ? getEncodedBundleUid(uid, quantity) : uid,
                        name: `option-${ uid }`
                    }}
                    events={{
                        onChange: updateSelectedValues
                    }}
                />
                { can_change_quantity && this.renderQuantityChange(uid, quantity) }
            </div>
        );
    }

    renderCheckBoxValues(options) {
        const { isRequired } = this.props;

        return (
            <FieldGroupContainer
                validationRule={{
                    isRequired,
                    selector: '[type="checkbox"]'
                }}
                validateOn={['onBlur']}
            >
                { options.map(this.renderCheckBox) }
            </FieldGroupContainer>
        );
    }

    renderRadio = (name, option) => {
        const {
            uid,
            can_change_quantity,
            quantity: defaultQuantity = 1
        } = option;

        const {
            updateSelectedValues,
            quantity: { [uid]: quantity = defaultQuantity }
        } = this.props;

        const label = this.getLabel(option);

        return (
            <div block="ProductBundleItem" elem="Radio" mods={ { customQuantity: can_change_quantity } } key={ uid }>
                <FieldContainer
                    type={ FIELD_TYPE.radio }
                    label={ label }
                    attr={{
                        id: `option-${ uid }`,
                        value: can_change_quantity ? getEncodedBundleUid(uid, quantity) : uid,
                        name: `option-${ name }`
                    }}
                    events={{
                        onChange: updateSelectedValues
                    }}
                />
                { can_change_quantity && this.renderQuantityChange(uid, quantity) }
            </div>
        );
    }

    renderRadioValues(options) {
        const { isRequired, uid } = this.props;

        return (
            <FieldGroupContainer
                validationRule={{
                    isRequired,
                    selector: '[type="radio"]'
                }}
                validateOn={['onBlur']}
            >
                { options.map((option) => this.renderRadio(uid, option)) }
            </FieldGroupContainer>
        );
    }

    updateSelect(...args) {
        const { updateSelectedValues, updateActiveSelectUid } = this.props;
        console.log([args]);
        updateActiveSelectUid(args[args.length - 1]);
        updateSelectedValues();
    }

    renderSelectValue() {
        const {
            dropdownOptions,
            isRequired,
            uid,
            activeSelectUid,
            options
        } = this.props;

        const activeOption = options.find(({ uid: optionUid, can_change_quantity }) => (
            can_change_quantity && activeSelectUid === optionUid
        ));

        const {
            uid: optionUid,
            quantity: defaultQuantity = 1,
            can_change_quantity = false
        } = activeOption || {};

        const {
            quantity: { [uid]: quantity = defaultQuantity }
        } = this.props;

        console.log([activeOption]);
        return (
            <div block="ProductBundleItem" elem="DropdownWrapper" mods={ { customQuantity: can_change_quantity } }>
                <FieldContainer
                    type={ FIELD_TYPE.select }
                    attr={{
                        id: `bundle-options-dropdown-${ uid }`,
                        name: `bundle-options-dropdown-${ uid }`
                    }}
                    mix={ { block: 'ProductBundleItem', elem: 'Select' } }
                    options={ dropdownOptions }
                    events={{
                        onChange: this.updateSelect.bind(this)
                    }}
                    validationRule={{
                        isRequired
                    }}
                    validateOn={ ['onChange'] }
                />
                { activeOption && this.renderQuantityChange(optionUid, quantity) }
            </div>
        );
    }

    renderOptionGroupTitle(title) {
        const { isRequired } = this.props;

        return (
            <div block="ProductBundleItem" elem="Heading">
                { title }
                { isRequired && <strong block="ProductBundleItem" elem="Required"> *</strong> }
            </div>
        );
    }


    render() {
        const { title, options, type } = this.props;
        const render = this.renderMap[type];

        if (!render) {
            return null;
        }

        return (
            <div block="ProductBundleItem" elem="Wrapper">
                { title && this.renderOptionGroupTitle(title) }
                { options && render(options) }
            </div>
        );
    }
}

export default BundleOption;
