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
import { connect } from 'react-redux';

import ProductList from 'Component/ProductList';
import ProductListQuery from 'Query/ProductList.query';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { getIndexedProducts } from 'Util/Product';
import DataContainer from 'Util/Request/DataContainer';

import './ProductListWidget.style';

/** @namespace Component/ProductListWidget/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({
    updateNoMatch,
    showNotification
});

/** @namespace Component/ProductListWidget/Container */
export class ProductListWidgetContainer extends DataContainer {
    static propTypes = {
        showPager: PropTypes.number,
        productsCount: PropTypes.number,
        productsPerPage: PropTypes.number,
        conditionsEncoded: PropTypes.string,
        updateNoMatch: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired
    };

    static defaultProps = {
        showPager: 0,
        productsCount: 10,
        productsPerPage: 5,
        conditionsEncoded: null
    };

    state = {
        pages: {},
        totalItems: 0,
        totalPages: 0,
        isLoading: true
    };

    containerFunctions = {
        requestProductList: this.requestProductList.bind(this),
        updateLoadStatus: this.updateLoadStatus.bind(this),
        getIsNewCategory: this.getIsNewCategory.bind(this)
    };

    onError = this.onError.bind(this);

    appendPage = this.appendPage.bind(this);

    updateProductListItems = this.updateProductListItems.bind(this);

    dataModelName = 'ProductListWidget';

    onError(error) {
        const { showNotification, updateNoMatch } = this.props;
        showNotification('error', __('Error fetching Product List!'), error);
        updateNoMatch(true);
    }

    getIsNewCategory() {
        return true;
    }

    appendPage(data) {
        const { showPager } = this.props;
        const { pages } = this.state;
        const {
            products: {
                items,
                page_info: { current_page } = {}
            } = {}
        } = data;

        if (showPager === 0) {
            return;
        }

        this.setState({
            pages: {
                ...pages,
                [current_page]: getIndexedProducts(items)
            }
        });
    }

    updateProductListItems(data) {
        const { productsCount, productsPerPage } = this.props;
        const {
            products: {
                items,
                total_count: totalItems,
                page_info: { current_page } = {}
            } = {}
        } = data;

        const totalPages = Math.ceil(productsCount / productsPerPage);

        this.setState({
            isLoading: false,
            totalItems,
            totalPages,
            pages: { [current_page]: getIndexedProducts(items) }
        });
    }

    updateLoadStatus(isLoading) {
        this.setState({ isLoading });
    }

    requestProductList(options) {
        const { isNext } = options;

        if (!isNext) {
            this.updateLoadStatus(true);
        }

        this.fetchData(
            [ProductListQuery.getQuery(options)],
            isNext ? this.appendPage : this.updateProductListItems,
            this.onError
        );
    }

    adaptProps() {
        const {
            showPager,
            productsCount,
            productsPerPage,
            conditionsEncoded: conditions
        } = this.props;

        return {
            filter: { conditions },
            pageSize: showPager ? productsPerPage : productsCount,
            isPaginationEnabled: !!showPager
        };
    }

    render() {
        const adaptedProps = this.adaptProps();

        return (
            <ProductList
              { ...this.props }
              { ...this.state }
              { ...adaptedProps }
              { ...this.containerFunctions }
              isInfiniteLoaderEnabled={ false }
              numberOfPlaceholders={ 6 }
              mix={ { block: 'ProductListWidget' } }
              isWidget
            />
        );
    }
}

/** @namespace Component/ProductListWidget/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListWidgetContainer);
