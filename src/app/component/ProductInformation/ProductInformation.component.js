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

import React, { Component } from 'react';
import ExpandableContent from 'Component/ExpandableContent';
import Html from 'Component/Html';
import ContentWrapper from 'Component/ContentWrapper';
import Image from 'Component/Image';
import { ProductType } from 'Type/ProductList';
import './ProductInformation.style';
import TextPlaceholder from 'Component/TextPlaceholder';

const PRODUCT_IMAGE_PATH = '/media/catalog/product';

class ProductInformation extends Component {
    renderContentPlaceholder() {
        return (
            <div block="ProductInformation" elem="Placeholder">
              <TextPlaceholder length="medium" />
              <TextPlaceholder length="long" />
              <TextPlaceholder length="medium" />
              <TextPlaceholder length="long" />
              <TextPlaceholder />
              <TextPlaceholder length="medium" />
              <TextPlaceholder length="long" />
            </div>
        );
    }

    render() {
        const { product: { description, thumbnail: { path = '' } = {} } } = this.props;
        const { html } = description || {};

        const imageUrl = path && `${PRODUCT_IMAGE_PATH}${ path }`;
        return (
            <ContentWrapper
              label="Product information"
              mix={ { block: 'ProductInformation' } }
              wrapperMix={ { block: 'ProductInformation', elem: 'Wrapper' } }
            >
                <Image
                  src={ imageUrl }
                  alt="Product image"
                  mix={ { block: 'ProductInformation', elem: 'Image' } }
                />
                <ExpandableContent
                  heading="Product information"
                  mix={ { block: 'ProductInformation', elem: 'Content' } }
                >
                    { html ? <Html content={ html } /> : this.renderContentPlaceholder() }
                </ExpandableContent>
            </ContentWrapper>
        );
    }
}

ProductInformation.propTypes = {
    product: ProductType.isRequired
};

export default ProductInformation;
