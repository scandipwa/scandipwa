/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import ProductBundleOption from 'Component/ProductBundleOption';
import { BundleOptionRendererType } from 'Component/ProductBundleOption/ProductBundleOption.type';
import { ReactElement } from 'Type/Common.type';
import { IndexedBundleItem } from 'Util/Product/Product.type';

import { ProductBundleOptionsComponentProps } from './ProductBundleOptions.type';

import './ProductBundleOptions.style';

/**
 * Product Bundle Options
 * @class ProductBundleOptions
 * @namespace Component/ProductBundleOptions/Component
 */
export class ProductBundleOptionsComponent extends PureComponent<ProductBundleOptionsComponentProps> {
    renderOptionGroup(group: IndexedBundleItem): ReactElement {
        const {
            title,
            options = [],
            type,
            required,
            uid,
            option_id,
        } = group;

        const { updateSelectedValues } = this.props;

        return (
            <ProductBundleOption
              key={ option_id }
              title={ title }
              options={ options }
              type={ type as BundleOptionRendererType }
              isRequired={ required }
              updateSelectedValues={ updateSelectedValues }
              uid={ uid }
            />
        );
    }

    render(): ReactElement {
        const { options = [] } = this.props;

        return (
          <div block="ProductBundleOptions" elem="Wrapper">
              { options.map(this.renderOptionGroup.bind(this)) }
          </div>
        );
    }
}

export default ProductBundleOptionsComponent;
