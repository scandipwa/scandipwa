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
import ProductBundleItemFields from './ProductBundleItemFields.component';

class ProductBundleItemFieldsContainer extends PureComponent {
    static propTypes = {
        option: PropTypes.object.isRequired,
        setItemQuantity: PropTypes.func.isRequired
    };

    state = {
        quantity: 1
    };

    containerFunctions = {
        setQuantity: this.setQuantity.bind(this)
    };

    componentDidMount() {
        this.setDefaultQuantity();
    }

    setDefaultQuantity() {
        const { option: { id, quantity }, setItemQuantity } = this.props;

        if (quantity) {
            const value = [id.toString()];

            this.setState({ quantity });
            setItemQuantity(value, quantity);
        }
    }

    setQuantity(quantity) {
        const { option: { id }, setItemQuantity } = this.props;
        const value = [id.toString()];

        this.setState({ quantity });
        setItemQuantity(value, quantity);
    }

    render() {
        return (
            <ProductBundleItemFields
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default ProductBundleItemFieldsContainer;
