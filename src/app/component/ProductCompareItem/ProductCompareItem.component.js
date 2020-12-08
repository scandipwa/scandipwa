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

import AddToCart from 'Component/AddToCart';
// import Image from 'Component/Image/Image.component';
import { ProductType } from 'Type/ProductList';

import './ProductCompareItem.style';

/** @namespace Component/ProductCompareItem/Component */
export class ProductCompareItem extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    renderProductImage() {
        const {
            product: {
                // id,
                name,
                thumbnail: { url }
            }
        } = this.props;

        // return (
        //     <figure block="ProductCompareItem" elem="Figure">
        //         <Image
        //           src={ url }
        //           alt={ name }
        //           ratio="custom"
        //           isPlaceholder={ !id }
        //         />
        //         <img
        //           style={ { display: 'none' } }
        //           alt={ name }
        //           src={ url }
        //         />
        //     </figure>
        // );

        return (
            <figure block="ProductCompareItem" elem="Figure">
                <img
                  alt={ name }
                  src={ url }
                />
            </figure>
        );
    }

    renderTitle() {
        const { product: { name } } = this.props;

        return (
            <h3 block="ProductCompareItem" elem="Title">
                { name }
            </h3>
        );
    }

    renderOptions() {
        return <div block="ProductCompareItem" elem="Options">Options List</div>;
    }

    renderAddToCartBtn() {
        const { product } = this.props;
        const quantity = 1; // TODO set a proper value
        const configurableVariantIndex = 0; // TODO set a proper value

        return (
            <AddToCart
              product={ product }
              quantity={ quantity }
              configurableVariantIndex={ configurableVariantIndex }
              mix={ { block: 'ProductCompareItem', elem: 'AddToCartBtn' } }
            />
        );
    }

    renderProductDetails() {
        return (
            <div block="ProductCompareItem" elem="Details">
                { this.renderTitle() }
                { this.renderOptions() }
                { this.renderAddToCartBtn() }
            </div>
        );
    }

    renderProductRemoveBtn() {
        return <button block="ProductCompareItem" elem="CloseBtn">&times;</button>;
    }

    render() {
        return (
            <div block="ProductCompareItem">
                { this.renderProductImage() }
                { this.renderProductDetails() }
                { this.renderProductRemoveBtn() }
            </div>
        );
    }
}

export default ProductCompareItem;
