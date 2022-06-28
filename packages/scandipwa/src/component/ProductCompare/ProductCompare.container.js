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
import { createRef, PureComponent } from 'react';
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

    scrollerScroll = createRef(null);

    productCompare = createRef(null);

    productCompareRow = createRef(null);

    scrollerContent = createRef(null);

    containerFunctions = {
        getAttributes: this.getAttributes.bind(this),
        clearCompareList: this.clearCompareList.bind(this),
        isInStock: getProductInStock.bind(this),
        handleScroll: this.handleScroll.bind(this),
        handleBlockScroll: this.handleBlockScroll.bind(this)
    };

    scrollerTriggered = false;

    blockScrollTriggered = false;

    componentDidMount() {
        this.fetchCompareList();
        scrollToTop({ behavior: 'smooth' });
    }

    componentDidUpdate() {
        const { device } = this.props;
        const productCompareRow = this.productCompareRow.current;
        const scrollerContent = this.scrollerContent.current;

        if (this.productCompareRow.current && this.scrollerContent.current) {
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
            device,
            scrollerScroll: this.scrollerScroll,
            productCompare: this.productCompare,
            productCompareRow: this.productCompareRow,
            scrollerContent: this.scrollerContent
        };
    }

    handleScroll() {
        /*
            This needs a little explaining:

            Setting element.scrollLeft actually causes browser scroll-handler events
            to fire.

            Without checking whether the scrollLeft was changed through function or
            through user-interaction, both functions will set each-other
            until element's scrollLeft delta is not 0 (new-scroll-left - old-scroll-left).

            Example:
            scroll-event -> handleScroll -> scrollLeft -> handleBlockScroll -> scrollLeft.

            Also keep in mind that event handlers are Async. Thats why we can only
            unset variables to `false` inside the handlers, otherwise it'd be hard to catch
            the moment to unset it.

        */
        const _blockScrollTriggered = this.blockScrollTriggered;
        this.blockScrollTriggered = false;

        if (!_blockScrollTriggered) {
            const { device } = this.props;

            if (device.isMobile) {
                return;
            }

            this.scrollerTriggered = true;

            this.productCompare.current.scrollLeft = this.scrollerScroll.current.scrollLeft;
        }
    }

    handleBlockScroll() {
        const _scrollerTriggered = this.scrollerTriggered;
        this.scrollerTriggered = false;

        if (!_scrollerTriggered) {
            this.blockScrollTriggered = true;

            this.scrollerScroll.current.scrollLeft = this.productCompare.current.scrollLeft;
        }
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
