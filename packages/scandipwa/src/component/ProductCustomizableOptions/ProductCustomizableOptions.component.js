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

import ProductCustomizableOption from 'Component/ProductCustomizableOption';
import { OptionsListType } from 'Type/ProductList.type';

import './ProductCustomizableOptions.style';

/**
 * Product Customizable Options
 * @class ProductCustomizableOptions
 * @namespace Component/ProductCustomizableOptions/Component
 */
export class ProductCustomizableOptions extends PureComponent {
    static propTypes = {
        options: OptionsListType.isRequired,
        updateSelectedValues: PropTypes.func.isRequired
    };

    renderOptionGroup(group) {
        const {
            title,
            value,
            type,
            required,
            uid
        } = group;

        const { updateSelectedValues } = this.props;

        return (
            <ProductCustomizableOption
              key={ uid }
              uid={ uid }
              title={ title }
              options={ value }
              isRequired={ required }
              type={ type }
              updateSelectedValues={ updateSelectedValues }
            />
        );
    }

    render() {
        const { options = [] } = this.props;

        return (
          <div block="ProductCustomizableOptions" elem="Wrapper">
              { options.map(this.renderOptionGroup.bind(this)) }
          </div>
        );
    }
}

export default ProductCustomizableOptions;
