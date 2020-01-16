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

import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import media, { PRODUCT_MEDIA } from 'Util/Media';
import Html from 'Component/Html';
import Image from 'Component/Image';
import { ProductType, AttributeType } from 'Type/ProductList';
import ContentWrapper from 'Component/ContentWrapper';
import TextPlaceholder from 'Component/TextPlaceholder';
import ExpandableContent from 'Component/ExpandableContent';
import ProductAttributeValue from 'Component/ProductAttributeValue';

import './ProductInformation.style';

export default class ProductInformation extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        attributesWithValues: AttributeType.isRequired
    };

    renderContentPlaceholder() {
        return (
            <div block="ProductInformation" elem="Placeholder">
                <p>
                    <TextPlaceholder length="paragraph" />
                </p>
            </div>
        );
    }

    renderImage() {
        const { product: { thumbnail: { path = '' } = {} } } = this.props;
        const imageUrl = path && media(path, PRODUCT_MEDIA);

        return (
          <Image
            src={ imageUrl }
            alt="Product image"
            mix={ { block: 'ProductInformation', elem: 'Image' } }
          />
        );
    }

    renderAttributeInfo = ([attributeLabel, valueLabel]) => (
        <Fragment key={ attributeLabel }>
            <dt block="ProductInformation" elem="AttributeLabel">
                { attributeLabel }
            </dt>
            <dd block="ProductInformation" elem="ValueLabel">
                <ProductAttributeValue
                  key={ attributeLabel }
                  attribute={ valueLabel }
                  isFormattedAsText
                />
            </dd>
        </Fragment>
    );

    renderAttributesInfo() {
        const { attributesWithValues } = this.props;
        if (!Object.keys(attributesWithValues).length) return null;

        return (
            <dl block="ProductInformation" elem="Attributes">
                { Object.entries(attributesWithValues).map(this.renderAttributeInfo) }
            </dl>
        );
    }

    renderContent() {
        const { product: { description: { html } = {} } } = this.props;
        if (!html) return this.renderContentPlaceholder();
        return <Html content={ html } />;
    }

    renderContentWrapper() {
        return (
            <ExpandableContent
              heading={ __('Product information') }
              mix={ { block: 'ProductInformation', elem: 'Content' } }
            >
                { this.renderContent() }
                { this.renderAttributesInfo() }
            </ExpandableContent>
        );
    }

    render() {
        const {
            product: {
                id,
                description: { html } = {}
            },
            areDetailsLoaded
        } = this.props;

        if (!html && id && areDetailsLoaded) return null;

        return (
            <ContentWrapper
              label="Product information"
              mix={ { block: 'ProductInformation' } }
              wrapperMix={ { block: 'ProductInformation', elem: 'Wrapper' } }
            >
                { this.renderImage() }
                { this.renderContentWrapper() }
            </ContentWrapper>
        );
    }
}
