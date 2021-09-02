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

import ProductBundleOption from 'Component/ProductBundleOption';

import './ProductBundleOptions.style';

export class ProductBundleOptions extends PureComponent {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        updateSelectedValues: PropTypes.func.isRequired
    };

    renderOptionGroup = (group) => {
        const {
            title, options, type, required, uid
        } = group;
        const { updateSelectedValues } = this.props;

        return (
            <ProductBundleOption
              title={ title }
              options={ options }
              type={ type }
              isRequired={ required }
              required={ required }
              updateSelectedValues={ updateSelectedValues }
              uid={ uid }
            />
        );
    };

    render() {
        const { options = [] } = this.props;

        return (
          <div>
              { options.map(this.renderOptionGroup) }
          </div>
        );
    }
}

export default ProductBundleOptions;
