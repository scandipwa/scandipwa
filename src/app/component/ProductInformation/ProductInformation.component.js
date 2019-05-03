import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpandableContent from 'Component/ExpandableContent';
import Html from 'Component/Html';
import { ProductType } from 'Type/ProductList';
import './ProductInformation.style';
import Image from 'Component/Image';

const PRODUCT_IMAGE_PATH = '/media/catalog/product';
const INFO_EXPANDABLE = 'expandable';
const INFO_BLOCK = 'block';

class ProductInformation extends Component {
    renderExpandableInformation() {
        const { product: { description } } = this.props;

        if (!description) return null;

        const { html } = description;

        return (
            <ExpandableContent heading="Product information">
                <Html content={ html } />
            </ExpandableContent>
        );
    }

    renderInformationBlock() {
        const { product: { description, image } } = this.props;

        if (!description || !image) return null;

        const { html } = description;
        const { path } = image;

        return (
            <section block="ProductInformation">
                <Image
                  src={ `${PRODUCT_IMAGE_PATH}${path}` }
                  alt="Product image"
                  mix={ { block: 'ProductInformation', elem: 'Image' } }
                />
                <div block="ProductInformation" elem="Information">
                    <Html content={ html } />
                </div>
            </section>
        );
    }

    renderInformationOfType(type) {
        switch (type) {
        case INFO_EXPANDABLE:
            return this.renderExpandableInformation();
        case INFO_BLOCK:
            return this.renderInformationBlock();
        default:
            return this.renderInformationBlock();
        }
    }

    render() {
        const { type } = this.props;

        return this.renderInformationOfType(type);
    }
}

ProductInformation.propTypes = {
    product: ProductType.isRequired,
    type: PropTypes.string.isRequired
};

export default ProductInformation;
