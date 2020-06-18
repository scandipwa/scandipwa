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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Field from 'Component/Field';

class ProductBundleItemFields extends PureComponent {
    static propTypes = {
        quantity: PropTypes.number.isRequired,
        maxQuantity: PropTypes.number.isRequired,
        setQuantity: PropTypes.func.isRequired
    };

    render() {
        const {
            quantity,
            maxQuantity,
            setQuantity
        } = this.props;

        return (
            <Field
              id="item_qty"
              name="item_qty"
              type="number"
              value={ quantity }
              max={ maxQuantity }
              min={ 1 }
              mix={ { block: 'ProductBundleItems', elem: 'Qty' } }
              onChange={ setQuantity }
            />
        );
    }
}

export default ProductBundleItemFields;
