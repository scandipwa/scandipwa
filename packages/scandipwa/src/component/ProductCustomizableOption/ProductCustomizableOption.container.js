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
import { connect } from 'react-redux';

import FIELD_TYPE from 'Component/Field/Field.config';
import { CustomizableOptionsType } from 'Type/ProductList.type';
import { customizableOptionsToSelectTransform, nonRequiredRadioOptions } from 'Util/Product/Transform';

import ProductCustomizableOption from './ProductCustomizableOption.component';
import { CONFIG_FIELD_TYPE, NONE_RADIO_OPTION } from './ProductCustomizableOption.config';

/** @namespace Component/ProductCustomizableOption/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    currencyCode: state.ConfigReducer.currencyData.current_currency_code
});

/** @namespace Component/ProductCustomizableOption/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/**
 * Product Customizable Option
 * @class ProductCustomizableOptionContainer
 * @namespace Component/ProductCustomizableOption/Container
 */
export class ProductCustomizableOptionContainer extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isRequired: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        options: CustomizableOptionsType.isRequired,
        updateSelectedValues: PropTypes.func.isRequired,
        currencyCode: PropTypes.string.isRequired
    };

    containerFunctions = {
        getDropdownOptions: this.getDropdownOptions.bind(this)
    };

    getFieldType() {
        const { type } = this.props;
        const typeKey = Object.keys(CONFIG_FIELD_TYPE).find((key) => CONFIG_FIELD_TYPE[key] === type);

        return FIELD_TYPE[typeKey];
    }

    getDropdownOptions() {
        const { options, currencyCode, type } = this.props;

        if (type !== CONFIG_FIELD_TYPE.select) {
            return null;
        }

        return customizableOptionsToSelectTransform(options, currencyCode);
    }

    containerProps() {
        const {
            uid,
            title,
            isRequired,
            type,
            updateSelectedValues,
            currencyCode,
            options
        } = this.props;

        return {
            uid,
            title,
            isRequired,
            type,
            options: nonRequiredRadioOptions(options, isRequired, type),
            updateSelectedValues,
            currencyCode,
            fieldType: this.getFieldType()
        };
    }

    getOptions(type) {
        const { options, isRequired } = this.props;

        if (type !== CONFIG_FIELD_TYPE.radio || isRequired) {
            return options;
        }

        const hasDefault = options.find(({ is_default }) => is_default);

        return [
            {
                ...NONE_RADIO_OPTION,
                is_default: !hasDefault
            },
            ...options
        ];
    }

    render() {
        return (
            <ProductCustomizableOption
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizableOptionContainer);
