import React, { Component } from 'react';
import ExpandableContent from 'Component/ExpandableContent';
import Html from 'Component/Html';
import ContentWrapper from 'Component/ContentWrapper';
import Image from 'Component/Image';
import { ProductType } from 'Type/ProductList';
import './ProductInformation.style';

const PRODUCT_IMAGE_PATH = '/media/catalog/product';

class ProductInformation extends Component {
    render() {
        const { product: { description, image } } = this.props;

        if (!description || !image) return null;

        const { html } = description;
        const { path } = image;

        return (
            <ContentWrapper
              label="Product information"
              mix={ { block: 'ProductInformation' } }
              wrapperMix={ { block: 'ProductInformation', elem: 'Wrapper' } }
            >
                <Image
                  src={ `${PRODUCT_IMAGE_PATH}${path}` }
                  alt="Product image"
                  mix={ { block: 'ProductInformation', elem: 'Image' } }
                />
                <ExpandableContent
                  heading="Product information"
                  mix={ { block: 'ProductInformation', elem: 'Content' } }
                >
                    <Html content={ html } />
                </ExpandableContent>
            </ContentWrapper>
        );
    }
}

ProductInformation.propTypes = {
    product: ProductType.isRequired
};

export default ProductInformation;
