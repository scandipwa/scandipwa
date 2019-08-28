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
import ExpandableContent from 'Component/ExpandableContent';
import Html from 'Component/Html';
import ContentWrapper from 'Component/ContentWrapper';
import Image from 'Component/Image';
import { ProductType } from 'Type/ProductList';
import './ProductInformation.style';
import TextPlaceholder from 'Component/TextPlaceholder';

export const PRODUCT_IMAGE_PATH = '/media/catalog/product';

export default class ProductInformation extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
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
        const imageUrl = path && `${PRODUCT_IMAGE_PATH}${ path }`;

        return (
          <Image
            src={ imageUrl }
            alt="Product image"
            mix={ { block: 'ProductInformation', elem: 'Image' } }
          />
        );
    }

    renderContent() {
        const { product: { description: { html } = {} } } = this.props;

        return (
            <ExpandableContent
              heading="Product information"
              mix={ { block: 'ProductInformation', elem: 'Content' } }
            >
                { html ? <Html content={ html } /> : this.renderContentPlaceholder() }
            </ExpandableContent>
        );
    }

    render() {
        const { product: { id, description: { html } = {} } } = this.props;
        if (!html && id) return null;

        return (
            <ContentWrapper
              label="Product information"
              mix={ { block: 'ProductInformation' } }
              wrapperMix={ { block: 'ProductInformation', elem: 'Wrapper' } }
            >
                { this.renderImage() }
                { this.renderContent() }
            </ContentWrapper>
        );
    }
}
