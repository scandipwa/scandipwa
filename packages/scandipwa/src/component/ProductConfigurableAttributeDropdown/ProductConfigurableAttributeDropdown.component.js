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
import FIELD_TYPE from 'Component/Field/Field.config';
import { noopFn } from 'Util/Common';

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
        selectName: PropTypes.string.isRequired,
        isUnselected: PropTypes.bool,
        handleShakeAnimationEnd: PropTypes.func
    };

    static defaultProps = {
        selectValue: '',
        selectLabel: 'attribute',
        handleShakeAnimationEnd: noopFn,
        isUnselected: false
    };

    render() {
        const {
            selectOptions,
            selectValue,
            selectName,
            selectLabel,
            onChange,
            handleShakeAnimationEnd,
            isUnselected
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              attr={ {
                  id: selectName,
                  name: selectName,
                  defaultValue: selectValue,
                  selectPlaceholder: __('Choose %s...', selectLabel.toLowerCase()),
                  onAnimationEnd: handleShakeAnimationEnd
              } }
              events={ {
                  onChange
              } }
              mix={ { block: 'ProductConfigurableAttributeDropdown', mods: { isUnselected } } }
              options={ selectOptions }
              changeValueOnDoubleClick
            />
        );
    }
}

export default ProductConfigurableAttributeDropdown;
