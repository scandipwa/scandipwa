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
import { Dispatch } from 'redux';

import {
    PRODUCT_COMPARE_FIRST_COLUMN_WIDTH
} from 'Component/ProductCompare/ProductCompare.config';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import { getProductInStock } from 'Util/Product/Extract';
import { RootState } from 'Util/Store/Store.type';

import ProductCompare from './ProductCompare.component';
import {
    ProductCompareAttributeShape,
    ProductCompareComponentContainerPropKeys,
    ProductCompareComponentProps,
    ProductCompareContainerFunctions,
    ProductCompareContainerMapDispatchProps,
    ProductCompareContainerMapStateProps,
    ProductCompareContainerProps
} from './ProductCompare.type';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

/** @namespace Component/ProductCompare/Container/mapStateToProps  */
export const mapStateToProps = (state: RootState): ProductCompareContainerMapStateProps => ({
    products: state.ProductCompareReducer.products,
    items: state.ProductCompareReducer.items,
    attributes: state.ProductCompareReducer.attributes,
    isLoading: state.ProductCompareReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductCompare/Container/mapDispatchToProps  */
export const mapDispatchToProps = (dispatch: Dispatch): ProductCompareContainerMapDispatchProps => ({
    fetchCompareList: () => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getCompareList(dispatch)
    ),
    clearCompareList: () => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.clearComparedProducts(dispatch)
    )
});

/** @namespace Component/ProductCompare/Container */
export class ProductCompareContainer extends PureComponent<ProductCompareContainerProps> {
    static defaultProps: Partial<ProductCompareContainerProps> = {
        isLoading: false,
        products: [],
        items: [],
        attributes: []
    };

    containerFunctions: ProductCompareContainerFunctions = {
        getAttributes: this.getAttributes.bind(this),
        clearCompareList: this.clearCompareList.bind(this),
        isInStock: getProductInStock.bind(this),
        handleScroll: this.handleScroll.bind(this),
        handleBlockScroll: this.handleBlockScroll.bind(this)
    };

    componentDidMount(): void {
        this.fetchCompareList();
        scrollToTop({ behavior: 'smooth' });
    }

    componentDidUpdate(): void {
        const { device } = this.props;

        const productCompareRow = document.getElementById('productCompareRow');
        const scrollerContent = document.getElementById('scrollerContent');

        if (scrollerContent && ((productCompareRow && productCompareRow.offsetWidth >= scrollerContent.offsetWidth)
            || (productCompareRow && productCompareRow.offsetWidth < scrollerContent.offsetWidth))) {
            const width = device.isMobile
                ? productCompareRow.offsetWidth
                : productCompareRow.offsetWidth - PRODUCT_COMPARE_FIRST_COLUMN_WIDTH;

            scrollerContent.style.width = `${width}px`;
        }
    }

    containerProps(): Pick<ProductCompareComponentProps, ProductCompareComponentContainerPropKeys> {
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

    handleScroll(): void {
        const scrollerScroll = document.getElementById('scrollerScroll');
        const productCompare = document.getElementById('productCompare');

        if (productCompare) {
            productCompare.scrollLeft = scrollerScroll?.scrollLeft || 0;
        }
    }

    handleBlockScroll(): void {
        const scrollerScroll = document.getElementById('scrollerScroll');
        const productCompare = document.getElementById('productCompare');

        if (scrollerScroll) {
            scrollerScroll.scrollLeft = productCompare?.scrollLeft || 0;
        }
    }

    fetchCompareList(): void {
        const { fetchCompareList } = this.props;

        fetchCompareList();
    }

    clearCompareList(): void {
        const { clearCompareList } = this.props;

        clearCompareList();
    }

    getAttributes(): ProductCompareAttributeShape[] {
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
                            [ code ]: {
                                html = ''
                            } = {}
                        } = product || {};

                        if (html) {
                            return html;
                        }
                    }

                    return attributes.find((attribute) => attribute.code === code)?.value || '';
                }
            )
        }));
    }

    render(): ReactElement {
        return (
            <ProductCompare
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareContainer);
