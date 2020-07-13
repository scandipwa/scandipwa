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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductList from 'Component/ProductList';
import { ProductListDispatcher, updateLoadStatus } from 'Store/ProductList';
import './CategoryProductList.style';

/** @namespace Component/CategoryProductList/Container/mapStateToProps */
export const mapStateToProps = state => ({
    pages: state.ProductListReducer.pages,
    isOffline: state.OfflineReducer.isOffline,
    isLoading: state.ProductListReducer.isLoading,
    totalItems: state.ProductListReducer.totalItems,
    totalPages: state.ProductListReducer.totalPages
});

/** @namespace Component/CategoryProductList/Container/mapDispatchToProps */
export const mapDispatchToProps = dispatch => ({
    requestProductList: options => ProductListDispatcher.handleData(dispatch, options),
    updateLoadStatus: isLoading => dispatch(updateLoadStatus(isLoading))
});

/** @namespace Component/CategoryProductList/Container */
export class CategoryProductListContainer extends ExtensiblePureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isOnlyPlaceholder: PropTypes.bool.isRequired,
        requestProductList: PropTypes.func.isRequired
    };

    containerFunctions = {
        requestProductList: this.requestProductList.bind(this)
    };

    getIsLoading() {
        const {
            isLoading,
            isOnlyPlaceholder
        } = this.props;

        if (!navigator.onLine) {
            return false;
        }

        if (isOnlyPlaceholder) {
            return true;
        }

        return isLoading;
    }

    requestProductList(options) {
        const {
            isOnlyPlaceholder,
            requestProductList
        } = this.props;

        if (isOnlyPlaceholder) {
            return;
        }

        requestProductList(options);
    }

    containerProps = () => ({
        isLoading: this.getIsLoading(),
        mix: { block: 'CategoryProductList' }
    });

    render() {
        return (
            <ProductList
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductListContainer);
