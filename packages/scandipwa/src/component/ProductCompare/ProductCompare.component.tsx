/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Component } from 'react';

import { ProductType } from 'Component/Product/Product.config';
import ProductCompareAttributeRow from 'Component/ProductCompareAttributeRow';
import ProductCompareItem from 'Component/ProductCompareItem';
import ProductPrice from 'Component/ProductPrice';
import { ComparableProduct } from 'Query/ProductCompare.type';
import { ReactElement } from 'Type/Common.type';
import { getPrice } from 'Util/Product/Extract';
import { StockCheckProduct } from 'Util/Product/Product.type';

import { ProductCompareComponentProps } from './ProductCompare.type';

import './ProductCompare.style';

/** @namespace Component/ProductCompare/Component */
export class ProductCompareComponent extends Component<ProductCompareComponentProps> {
    static defaultProps: Partial<ProductCompareComponentProps> = {
        isLoading: false,
        products: [],
    };

    shouldComponentUpdate(nextProps: ProductCompareComponentProps): boolean {
        const { products, isLoading } = this.props;
        const { products: nextProducts, isLoading: nextIsLoading } = nextProps;

        return products !== nextProducts || isLoading !== nextIsLoading;
    }

    renderScroll(): ReactElement {
        const { handleScroll, scrollerScroll, scrollerContent } = this.props;

        return (
            <div block="ProductCompare" elem="Scroller">
                <div block="ProductCompare" elem="ScrollerInner">
                    <div
                      id="scrollerScroll"
                      block="ProductCompare"
                      elem="ScrollerScroll"
                      onScroll={ handleScroll }
                      ref={ scrollerScroll }
                    >
                        <div
                          id="scrollerContent"
                          block="ProductCompare"
                          elem="ScrollerContent"
                          ref={ scrollerContent }
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderHeading(): ReactElement {
        const { device } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <h1 block="ContactPage" elem="Heading">
                { __('Product compare') }
            </h1>
        );
    }

    renderClearButton(): ReactElement {
        const { clearCompareList } = this.props;

        return (
            <div
              block="ProductCompare"
              elem="FirstColumn"
              mix={ { block: 'ClearButton' } }
            >
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  onClick={ clearCompareList }
                >
                    { __('Clear Compare') }
                </button>
            </div>
        );
    }

    renderProductCards(): ReactElement {
        const { products, isInStock } = this.props;

        return products.map((product) => (
            <div block="ProductCompare" elem="Item" key={ product.id }>
                <ProductCompareItem
                  product={ product }
                  isInStock={ isInStock }
                />
            </div>
        ));
    }

    renderPriceLabel(): ReactElement {
        return (
            <div
              block="ProductCompareAttributeRow"
              elem="Title"
            >
                { __('Price') }
            </div>
        );
    }

    renderProductPrice(product: ComparableProduct): ReactElement {
        const { isInStock } = this.props;

        if (!isInStock(product as Partial<StockCheckProduct>)) {
            return (
                <div block="ProductCompareAttributeRow" elem="OutOfStock">{ __('Out of stock') }</div>
            );
        }

        const {
            price_range,
            dynamic_price,
            type_id,
            id,
        } = product;

        const price = getPrice(price_range, dynamic_price, {}, type_id as ProductType);

        return (
            <ProductPrice
              price={ price }
              key={ id }
              priceType={ type_id as ProductType }
              isPreview
            />
        );
    }

    renderProductPrices(): ReactElement {
        const { products } = this.props;

        return products.map((product) => this.renderProductPrice(product));
    }

    renderAttributes(): ReactElement {
        const { getAttributes } = this.props;
        const attributes = getAttributes();

        return attributes.map(({ attribute_id, attribute_label, attribute_values }) => (
            <ProductCompareAttributeRow
              title={ attribute_label }
              values={ attribute_values }
              key={ attribute_id }
            />
        ));
    }

    renderProducts(): ReactElement {
        const { handleBlockScroll, productCompare, productCompareRow } = this.props;

        return (
            <>
                { this.renderScroll() }
                <div
                  id="productCompare"
                  block="ProductCompare"
                  onScroll={ handleBlockScroll }
                  ref={ productCompare }
                >

                    <div
                      id="productCompareRow"
                      block="ProductCompare"
                      elem="Row"
                      mix={ { block: 'ProductCardRow' } }
                      ref={ productCompareRow }
                    >
                        { this.renderClearButton() }
                        { this.renderProductCards() }
                    </div>
                    <div
                      block="ProductCompare"
                      elem="AttributeTable"
                    >
                        <div
                          block="ProductCompareAttributeRow"
                        >
                            { this.renderPriceLabel() }
                            <div block="ProductCompareAttributeRow" elem="Values">
                                { this.renderProductPrices() }
                            </div>
                        </div>
                        { this.renderAttributes() }
                    </div>
                </div>
            </>
        );
    }

    renderEmpty(): ReactElement {
        return (
            <div block="ProductCompare" elem="Empty">
                { __('You have nothing to compare') }
            </div>
        );
    }

    renderContent(): ReactElement {
        const {
            isLoading,
            products,
        } = this.props;
        const hasProducts = products && products.length;

        if (isLoading) {
            return null;
        }

        if (!hasProducts) {
            return this.renderEmpty();
        }

        return this.renderProducts();
    }

    render(): ReactElement {
        return (
            <>
                { this.renderHeading() }
                { this.renderContent() }
            </>
        );
    }
}

export default ProductCompareComponent;
