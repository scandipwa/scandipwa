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

import Image from 'Component/Image';
import { ImageRatio } from 'Component/Image/Image.type';
import { ImageType, MediaType } from 'Component/ProductGallery/ProductGallery.config';
import { ReactElement } from 'Type/Common.type';
import media, { PRODUCT_MEDIA } from 'Util/Media';

import { ProductGalleryThumbnailImageComponentProps } from './ProductGalleryThumbnailImage.type';

import './ProductGalleryThumbnailImage.style';

/** @namespace Component/ProductGalleryThumbnailImage/Component */
export class ProductGalleryThumbnailImageComponent extends PureComponent<ProductGalleryThumbnailImageComponentProps> {
    renderMedia(): ReactElement {
        const { media: { media_type } } = this.props;

        switch (media_type) {
        case MediaType.VIDEO:
            return this.renderVideo();
        case MediaType.IMAGE:
            return this.renderImage();
        case MediaType.PLACEHOLDER:
            return this.renderPlaceholder();
        default:
            return null;
        }
    }

    renderPlaceholder(): ReactElement {
        return (
            <Image
              ratio={ ImageRatio.IMG_CUSTOM }
              mix={ { block: 'ProductGalleryThumbnailImage' } }
              isPlaceholder
            />
        );
    }

    renderVideo(): ReactElement {
        const {
            media: {
                thumbnail: { url },
                label,
            },
        } = this.props;

        return (
            <Image
              ratio={ ImageRatio.IMG_CUSTOM }
              src={ url }
              alt={ label }
              mix={ { block: 'ProductGalleryThumbnailImage' } }
            />
        );
    }

    renderImage(): ReactElement {
        const {
            media: {
                label: alt,
                file,
                thumbnail: { url: thumbnailUrl } = {},
                id,
            },
        } = this.props;

        // !FIXME: Possible dead code. Id is number and cannot be comparable to the 'thumbnail' value.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (id === ImageType.THUMBNAIL) {
            return this.renderPlaceholder();
        }

        const src = thumbnailUrl || media(file, PRODUCT_MEDIA);

        return (
            <Image
              src={ src }
              alt={ alt }
              ratio={ ImageRatio.IMG_CUSTOM }
              mix={ { block: 'ProductGalleryThumbnailImage' } }
            />
        );
    }

    render(): ReactElement {
        return (
            <div
              block="ProductGalleryThumbnailImage"
            >
                { this.renderMedia() }
            </div>
        );
    }
}

export default ProductGalleryThumbnailImageComponent;
