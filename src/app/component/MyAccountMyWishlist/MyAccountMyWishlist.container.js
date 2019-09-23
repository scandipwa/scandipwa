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
import { connect } from 'react-redux';
import MyAccountMyWishlist from './MyAccountMyWishlist.component';

export const mapStateToProps = state => ({
    isLoading: state.WishlistReducer.isLoading,
    wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = dispatch => ({
    // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class MyAccountMyWishlistContainer extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    containerFunctions = () => ({
        getParameters: this.getParameters
    });

    containerProps = () => {
        // isDisabled: this._getIsDisabled()
    };

    getParameters = (sku, product) => {
        const { variants, configurable_options } = product;

        const options = Object.keys(configurable_options) || [];
        const { attributes = {} } = variants.find(({ sku: variantSku }) => variantSku === sku);
        const parameters = Object.entries(attributes).reduce((acc, [code, { attribute_value }]) => {
            if (!options.includes(code)) return acc;

            return {
                ...acc,
                [code]: [attribute_value]
            };
        }, {});

        return parameters;
    };

    render() {
        return (
            <MyAccountMyWishlist
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountMyWishlistContainer);
