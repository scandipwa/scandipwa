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

import ProductCustomizableOption from 'Component/ProductCustomizableOption';
import { ConfigFieldType } from 'Component/ProductCustomizableOption/ProductCustomizableOption.config';
import { CustomFieldValue } from 'Component/ProductCustomizableOption/ProductCustomizableOption.type';
import { ReactElement } from 'Type/Common.type';
import { IndexedCustomOption } from 'Util/Product/Product.type';

import { ProductCustomizableOptionsComponentProps } from './ProductCustomizableOptions.type';

import './ProductCustomizableOptions.style';

/**
 * Product Customizable Options
 * @class ProductCustomizableOptions
 * @namespace Component/ProductCustomizableOptions/Component
 */
export class ProductCustomizableOptionsComponent extends PureComponent<ProductCustomizableOptionsComponentProps> {
    static defaultProps: Partial<ProductCustomizableOptionsComponentProps> = {
        options: [],
    };

    renderOptionGroup(group: IndexedCustomOption): ReactElement {
        const {
            title,
            value,
            type,
            required,
            uid,
        } = group;

        const { updateSelectedValues } = this.props;

        return (
            <ProductCustomizableOption
              key={ uid }
              uid={ uid }
              title={ title }
              options={ value as CustomFieldValue[] }
              isRequired={ required }
              type={ type as ConfigFieldType }
              updateSelectedValues={ updateSelectedValues }
            />
        );
    }

    render(): ReactElement {
        const { options = [] } = this.props;

        if (!options) {
            return null;
        }

        options.sort((first, second) => (first.sort_order - second.sort_order));

        return (
          <div block="ProductCustomizableOptions" elem="Wrapper">
              { options.map(this.renderOptionGroup.bind(this)) }
          </div>
        );
    }
}

export default ProductCustomizableOptionsComponent;
