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

import ProductCompareButton from './ProductCompareButton.component';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

/** @namespace Component/ProductCompareButton/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/ProductCompareButton/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    addProductToCompare: (productId) => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCompare(productId, dispatch)
    )
});

/** @namespace Component/ProductCompareButton/Container */
export class ProductCompareButtonContainer extends PureComponent {
    static propTypes = {
        productId: PropTypes.number.isRequired,
        addProductToCompare: PropTypes.func.isRequired
    };

    state = {
        isLoading: false
    };

    containerFunctions = {
        handleClick: this.handleClick.bind(this)
    };

    async handleClick() {
        const { addProductToCompare, productId } = this.props;

        this.setState({ isLoading: true });

        await addProductToCompare(productId);

        this.setState({ isLoading: false });
    }

    render() {
        return (
            <ProductCompareButton
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareButtonContainer);
