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

import { PureComponent } from 'react';
import { TransformComponent } from 'react-zoom-pan-pinch';

import Image from 'Component/Image';
import { ImageRatio } from 'Component/Image/Image.type';
import { ReactElement } from 'Type/Common.type';

import { ProductGalleryComponentProps } from './ProductGalleryBaseImage.type';

/** @namespace Component/ProductGalleryBaseImage/Component */
export class ProductGalleryBaseImageComponent<
P extends Readonly<ProductGalleryComponentProps> = Readonly<ProductGalleryComponentProps>,
S extends ProductGalleryBaseImageComponentState = ProductGalleryBaseImageComponentState,
> extends PureComponent<P, S> {
    render(): ReactElement {
        const { src, alt } = this.props;

        return (
            <TransformComponent>
                <Image
                  src={ src }
                  ratio={ ImageRatio.IMG_CUSTOM }
                  mix={ {
                      block: 'ProductGallery',
                      elem: 'SliderImage',
                      mods: { isPlaceholder: !src },
                  } }
                  isPlaceholder={ !src }
                  alt={ alt }
                />
                <img
                  style={ { display: 'none' } }
                  alt={ alt }
                  src={ src }
                  itemProp="image"
                />
            </TransformComponent>
        );
    }
}

export default ProductGalleryBaseImageComponent;
