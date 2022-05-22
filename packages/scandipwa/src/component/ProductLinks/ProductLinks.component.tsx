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

import ContentWrapper from 'Component/ContentWrapper';
import ProductCard from 'Component/ProductCard';
import { ReactElement } from 'Type/Common.type';
import { IndexedProduct } from 'Util/Product/Product.type';

import { ProductLinksComponentProps } from './ProductLinks.type';

import './ProductLinks.style';

/** @namespace Component/ProductLinks/Component */
export class ProductLinks extends PureComponent<ProductLinksComponentProps> {
    __construct(props: ProductLinksComponentProps): void {
        super.__construct?.(props);

        this.renderProductCard = this.renderProductCard.bind(this);
    }

    renderProductCard(product: IndexedProduct, i: number): ReactElement {
        // const {
        // productCardProps: {
        //     siblingsHaveBrands,
        //     siblingsHavePriceBadge,
        //     siblingsHaveTierPrice,
        //     siblingsHaveConfigurableOptions
        // },
        // productCardFunctions: {
        //     setSiblingsHaveBrands,
        //     setSiblingsHavePriceBadge,
        //     setSiblingsHaveTierPrice,
        //     setSiblingsHaveConfigurableOptions
        // }
        // } = this.props;
        const { id = i } = product;

        return (
            <ProductCard
              block="ProductLinks"
              elem="Card"
              product={ product }
              key={ id }
            // !FIXME: This seems to be the obsolete code. We should remove it from all components.
            //   siblingsHaveBrands={ siblingsHaveBrands }
            //   siblingsHavePriceBadge={ siblingsHavePriceBadge }
            //   siblingsHaveTierPrice={ siblingsHaveTierPrice }
            //   siblingsHaveConfigurableOptions={ siblingsHaveConfigurableOptions }
            //   setSiblingsHaveBrands={ setSiblingsHaveBrands }
            //   setSiblingsHavePriceBadge={ setSiblingsHavePriceBadge }
            //   setSiblingsHaveTierPrice={ setSiblingsHaveTierPrice }
            //   setSiblingsHaveConfigurableOptions={ setSiblingsHaveConfigurableOptions }
            />
        );
    }

    renderItems(): ReactElement {
        const {
            linkType,
            linkedProducts: { [linkType]: { items = [] } = {} },
            numberOfProductsToDisplay
        } = this.props;

        if (!items?.length) {
            return Array.from(
                { length: numberOfProductsToDisplay },
                (_, i) => this.renderProductCard({}, i)
            );
        }

        return items.slice(0, numberOfProductsToDisplay).map(this.renderProductCard);
    }

    renderHeading(): ReactElement {
        const { title } = this.props;

        return (
            <h2 block="ProductLinks" elem="Title">
                { title }
            </h2>
        );
    }

    render(): ReactElement {
        const { areDetailsLoaded } = this.props;

        if (!areDetailsLoaded) {
            return null;
        }

        return (
            <ContentWrapper
              mix={ { block: 'ProductLinks' } }
              wrapperMix={ { block: 'ProductLinks', elem: 'Wrapper' } }
              label={ __('Linked products') }
            >
                { this.renderHeading() }
                <ul block="ProductLinks" elem="List">
                    { this.renderItems() }
                </ul>
            </ContentWrapper>
        );
    }
}

export default ProductLinks;
