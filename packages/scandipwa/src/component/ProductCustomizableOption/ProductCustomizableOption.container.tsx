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

import { FieldType } from 'Component/Field/Field.config';
import { ReactElement } from 'Type/Common.type';
import { CustomizableOptionsType } from 'Type/ProductList.type';
import { sortBySortOrder } from 'Util/Product';
import { customizableOptionsToSelectTransform, nonRequiredRadioOptions } from 'Util/Product/Transform';

import ProductCustomizableOption from './ProductCustomizableOption.component';
import { CONFIG_FieldType } from './ProductCustomizableOption.config';

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
        options: CustomizableOptionsType,
        updateSelectedValues: PropTypes.func.isRequired,
        currencyCode: PropTypes.string.isRequired
    };

    static defaultProps = {
        options: []
    };

    containerFunctions = {
        getDropdownOptions: this.getDropdownOptions.bind(this)
    };

    getFieldType() {
        const { type } = this.props;
        const typeKey = Object.keys(CONFIG_FieldType).find((key) => CONFIG_FieldType[ key ] === type);

        return FieldType[ typeKey ];
    }

    getDropdownOptions() {
        const { options, currencyCode, type } = this.props;

        if (type !== CONFIG_FieldType.SELECT) {
            return null;
        }

        return sortBySortOrder(customizableOptionsToSelectTransform(options, currencyCode));
    }

    getSortedOptions() {
        const { options = {} } = this.props;

        if (!Array.isArray(options)) {
            return options;
        }

        return sortBySortOrder(options);
    }

    containerProps() {
        const {
            uid,
            title,
            isRequired,
            type,
            updateSelectedValues,
            currencyCode
        } = this.props;

        return {
            uid,
            title,
            isRequired,
            type,
            options: nonRequiredRadioOptions(this.getSortedOptions(), isRequired, type),
            updateSelectedValues,
            currencyCode,
            fieldType: this.getFieldType()
        };
    }

    render(): ReactElement {
        return (
            <ProductCustomizableOption
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizableOptionContainer);
