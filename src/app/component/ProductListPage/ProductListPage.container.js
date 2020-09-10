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

import ProductListPage from './ProductListPage.component';

export class ProductListPageContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            // any number as default value, but not 0
            // it will be reseted either in CDM method or on resize event
            productItemHeight: 111,
            itemsInRow: 4
        };
    }

    componentDidMount() {
        this.setState({
            productItemHeight: this.getProductCardFullHeight(),
            itemsInRow: this.getProductsInRow(window.innerWidth)
        });
        this.setState({
            productItemHeight: this.getProductCardFullHeight(),
            itemsInRow: this.getProductsInRow(window.innerWidth)
        });
        window.addEventListener('resize', this.setProductItemProperties);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setProductItemProperties);
    }

    getProductCardFullHeight = () => {
        const productItem = document.querySelector('.ProductCard');

        const productItemMarginBottom = productItem && parseInt(window.getComputedStyle(productItem).marginBottom, 10);
        const productItemMarginTop = productItem && parseInt(window.getComputedStyle(productItem).marginTop, 10);
        const productItemVerticalMargin = productItemMarginBottom + productItemMarginTop;

        const productItemHeight = productItem ? productItem.clientHeight + productItemVerticalMargin : 0;

        return productItemHeight;
    };

    getProductsInRow = (screenWidth) => {
        const tabletScreenBorder = 1024;
        const mobileScreenBorder = 768;

        const renderedItemsInRow = {
            desktop: 4,
            tablet: 3,
            mobile: 2
        };

        if (screenWidth <= tabletScreenBorder && screenWidth >= mobileScreenBorder) {
            return renderedItemsInRow.tablet;
        }
        if (screenWidth < mobileScreenBorder) {
            return renderedItemsInRow.mobile;
        }

        return renderedItemsInRow.desktop;
    };

    setProductItemProperties = (e = null) => {
        this.setState({
            productItemHeight: this.getProductCardFullHeight(),
            itemsInRow: this.getProductsInRow(e.target.innerWidth)
        });
    };

    containerProps() {
        const { productItemHeight, itemsInRow } = this.state;

        return ({
            productItemHeight,
            itemsInRow,
            ...this.props
        });
    }

    render() {
        return (
            <ProductListPage
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductListPageContainer;
