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

import FIELD_TYPE from 'Component/PureForm/Field/Field.config';
import { customizableOptionsToSelectTransform } from 'Util/Product/Transform';

import ProductCustomizableOption from './ProductCustomizableOption.component';
import { CONFIG_FIELD_TYPE } from './ProductCustomizableOption.config';

export const mapStateToProps = (state) => ({
    currencyCode: state.ConfigReducer.currencyData.current_currency_code
});

export const mapDispatchToProps = () => ({
});

export class ProductCustomizableOptionContainer extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        isRequired: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
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
        return {
            ...this.props
        };
    }

    render() {
        return (
            <ProductCustomizableOption
              { ...this.containerProps() }
              { ...this.containerFunctions }
              fieldType={ this.getFieldType() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizableOptionContainer);
