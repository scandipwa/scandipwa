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

import {
    PRODUCT_COMPARE_FIRST_COLUMN_WIDTH
} from 'Component/ProductCompare/ProductCompare.config';
import { DeviceType } from 'Type/Device.type';
import { ItemType, ProductItemsType } from 'Type/ProductList.type';
import { scrollToTop } from 'Util/Browser';
import { getProductInStock } from 'Util/Product/Extract';

import ProductCompare from './ProductCompare.component';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

/** @namespace Component/ProductCompare/Container/mapStateToProps  */
export const mapStateToProps = (state) => ({
    products: state.ProductCompareReducer.products,
    items: state.ProductCompareReducer.items,
    attributes: state.ProductCompareReducer.attributes,
    isLoading: state.ProductCompareReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductCompare/Container/mapDispatchToProps  */
export const mapDispatchToProps = (dispatch) => ({
    fetchCompareList: () => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getCompareList(dispatch)
    ),
    clearCompareList: () => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.clearComparedProducts(dispatch)
    )
});

/** @namespace Component/ProductCompare/Container */
export class ProductCompareContainer extends PureComponent {
    static propTypes = {
        fetchCompareList: PropTypes.func.isRequired,
        clearCompareList: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        products: ProductItemsType,
        items: PropTypes.arrayOf(PropTypes.shape({
            products: ItemType,
            attributes: PropTypes.arrayOf(PropTypes.shape({
                code: PropTypes.string,
                value: PropTypes.string
            }))
        })),
        attributes: PropTypes.arrayOf(PropTypes.shape({
            code: PropTypes.string,
            label: PropTypes.string
        })),
        device: DeviceType.isRequired
    };

    static defaultProps = {
        isLoading: false,
        products: [],
        items: [],
        attributes: []
    };

    state = {
        scrollerScroll: document.getElementById('scrollerScroll'),
        productCompare: document.getElementById('productCompare')
    };

    containerFunctions = {
        getAttributes: this.getAttributes.bind(this),
        clearCompareList: this.clearCompareList.bind(this),
        isInStock: getProductInStock.bind(this),
        handleScroll: this.handleScroll.bind(this),
        handleBlockScroll: this.handleBlockScroll.bind(this)
    };

    componentDidMount() {
        this.fetchCompareList();
        scrollToTop({ behavior: 'smooth' });
    }

    componentDidUpdate(_, prevState) {
        const { device } = this.props;
        const productCompareRow = document.getElementById('productCompareRow');
        const scrollerContent = document.getElementById('scrollerContent');

        if (!prevState.scrollerScroll && !prevState.productCompare) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(
                {
                    scrollerScroll: document.getElementById('scrollerScroll'),
                    productCompare: document.getElementById('productCompare')
                }
            );
        }

        if (productCompareRow && scrollerContent) {
            const width = device.isMobile
                ? productCompareRow.offsetWidth
                : productCompareRow.offsetWidth - PRODUCT_COMPARE_FIRST_COLUMN_WIDTH;

            scrollerContent.style.width = `${ width }px`;
        }
    }

    containerProps() {
        const {
            isLoading,
            products,
            device
        } = this.props;

        return {
            isLoading,
            products,
            device
        };
    }

    handleScroll() {
        const { device } = this.props;

        if (device.isMobile) {
            return;
        }
        const { scrollerScroll, productCompare } = this.state;

        productCompare.scrollLeft = scrollerScroll.scrollLeft;
    }

    handleBlockScroll() {
        const { scrollerScroll, productCompare } = this.state;

        scrollerScroll.scrollLeft = productCompare.scrollLeft;
    }

    fetchCompareList() {
        const { fetchCompareList } = this.props;

        fetchCompareList();
    }

    clearCompareList() {
        const { clearCompareList } = this.props;

        clearCompareList();
    }

    getAttributes() {
        const { attributes, items } = this.props;

        if (!items.length || !attributes.length) {
            return [];
        }

        return attributes.map(({ code, label }) => ({
            attribute_id: code,
            attribute_code: code,
            attribute_label: label,
            attribute_values: items.map(
                ({ product, attributes }) => {
                    if (code === 'description' || code === 'short_description') {
                        const {
                            [code]: {
                                html
                            } = {}
                        } = product || {};

                        if (html) {
                            return html;
                        }
                    }

                    return attributes.find((attribute) => attribute.code === code).value;
                }
            )
        }));
    }

    render() {
        return (
            <ProductCompare
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareContainer);
