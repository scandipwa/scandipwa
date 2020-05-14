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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductList from 'Component/ProductList';
import { ProductListDispatcher, updateLoadStatus } from 'Store/ProductList';

export const mapStateToProps = state => ({
    pages: state.ProductListReducer.pages,
    isOffline: state.OfflineReducer.isOffline,
    isLoading: state.ProductListReducer.isLoading,
    totalItems: state.ProductListReducer.totalItems,
    totalPages: state.ProductListReducer.totalPages
});

export const mapDispatchToProps = dispatch => ({
    requestProductList: options => ProductListDispatcher.handleData(dispatch, options),
    updateLoadStatus: isLoading => dispatch(updateLoadStatus(isLoading))
});

export class CategoryProductListContainer extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    getIsLoading() {
        const { isLoading } = this.props;

        if (!navigator.onLine) {
            return false;
        }

        return isLoading;
    }

    containerProps = () => ({
        isLoading: this.getIsLoading()
    });

    render() {
        return (
            <ProductList
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductListContainer);
