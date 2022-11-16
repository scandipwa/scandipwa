/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Component, createRef } from 'react';

import ProductCard from 'Component/ProductCard';
import { ReactElement } from 'Type/Common.type';
import CSS from 'Util/CSS';
import { IndexedProduct } from 'Util/Product/Product.type';

import { NewProductsComponentProps } from './NewProducts.type';

import './NewProducts.style';

/** @namespace Component/NewProducts/Component */
export class NewProductsComponent extends Component<NewProductsComponentProps> {
    static defaultProps: Partial<NewProductsComponentProps> = {
        products: Array.from({ length: 4 }, () => ({})),
    };

    newProductsRef = createRef<HTMLElement>();

    __construct(props: NewProductsComponentProps): void {
        super.__construct?.(props);

        this.renderProductCard = this.renderProductCard.bind(this);
    }

    componentDidMount(): void {
        this.setStyles();
    }

    shouldComponentUpdate(nextProps: NewProductsComponentProps): boolean {
        const { products, productsPerPage } = this.props;
        const {
            products: nextProducts,
            productsPerPage: nextProductsPerPage,
        } = nextProps;

        return products !== nextProducts || productsPerPage !== nextProductsPerPage;
    }

    componentDidUpdate(): void {
        this.setStyles();
    }

    setStyles(): void {
        const { productsPerPage } = this.props;

        CSS.setVariable(this.newProductsRef, 'new-products-per-page-count', productsPerPage);
    }

    renderProductCard(product: IndexedProduct, i: number): ReactElement {
        return (
            <ProductCard
              key={ product.id || i }
              product={ product }
            />
        );
    }

    render(): ReactElement {
        const { products } = this.props;

        return (
            <section block="NewProducts" ref={ this.newProductsRef }>
                <h2>{ __('New Products') }</h2>
                <ul block="NewProducts" elem="Products">
                    { products.map(this.renderProductCard) }
                </ul>
            </section>
        );
    }
}

export default NewProductsComponent;
