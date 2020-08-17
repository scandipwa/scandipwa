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

import { ProductType } from 'Type/ProductList';

import UpsellProducts from './UpsellProducts.component';
import { UPSELL } from './UpsellProducts.config';

export const mapStateToProps = (state) => ({
    linkedProducts: state.LinkedProductsReducer.linkedProducts
});

export class UpsellProductsContainer extends PureComponent {
    static propTypes = {
        products: PropTypes.array,
        linkedProducts: PropTypes.objectOf(ProductType).isRequired
    };

    static defaultProps = {
        products: []
    };

    render() {
        const {
            linkedProducts: {
                upsell: {
                    total_count
                }
            },
            products
        } = this.props;

        const productIsLoaded = products.length !== 0;
        if (!productIsLoaded || total_count === 0) {
            return null;
        }

        const hasUpSells = products.some(({ product_links }) => (
            product_links && product_links.some(({ link_type }) => link_type === UPSELL)
        ));

        if (!hasUpSells) {
            return null;
        }

        return (
            <UpsellProducts
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps)(UpsellProductsContainer);
