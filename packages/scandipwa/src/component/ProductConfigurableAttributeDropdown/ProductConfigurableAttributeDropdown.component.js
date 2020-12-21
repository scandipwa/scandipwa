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

import Field from 'Component/Field';

import './ProductConfigurableAttributeDropdown.style';

/** @namespace Component/ProductConfigurableAttributeDropdown/Component */
export class ProductConfigurableAttributeDropdown extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        selectOptions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            id: PropTypes.string,
            value: PropTypes.string
        })).isRequired,
        selectValue: PropTypes.string,
        selectLabel: PropTypes.string,
        selectName: PropTypes.string.isRequired
    };

    static defaultProps = {
        selectValue: '',
        selectLabel: 'attribute'
    };

    render() {
        const {
            selectOptions,
            selectValue,
            selectName,
            selectLabel,
            onChange
        } = this.props;

        return (
            <Field
              id={ selectName }
              name={ selectName }
              type="select"
              placeholder={ __('Choose %s', selectLabel.toLowerCase()) }
              mix={ { block: 'ProductConfigurableAttributeDropdown' } }
              selectOptions={ selectOptions }
              value={ selectValue }
              onChange={ onChange }
            />
        );
    }
}

export default ProductConfigurableAttributeDropdown;
